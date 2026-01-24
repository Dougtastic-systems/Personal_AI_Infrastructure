# Continuation: Graphiti Temporal Knowledge Graph Deep Dive

**Created:** 2026-01-21
**Status:** Research Complete - Implementation Ready
**Priority:** High - Core PAI infrastructure
**Full Research:** `~/.claude/MEMORY/research/2026-01/GRAPHITI_TEMPORAL_KG_DEEP_DIVE.md`

---

## What is a Temporal Knowledge Graph?

A **temporal knowledge graph** extends regular knowledge graphs by adding time as a first-class dimension:

- **Historical queries:** "What did we know about Project X in Q3?"
- **Change tracking:** "How has Sarah's role evolved?"
- **Contradiction detection:** "The new fact conflicts with a previous fact"
- **Point-in-time reconstruction:** "What was the state of knowledge on January 15th?"

### Bi-Temporal Model

Graphiti implements **bi-temporal tracking** with four time dimensions:

| Dimension | Field | Purpose |
|-----------|-------|---------|
| **Valid Time** | `valid_at` | When the fact became true in the real world |
| **Transaction Time** | `created_at` | When the fact was recorded in the system |
| **Invalidation Time** | `invalid_at` | When the fact ceased to be true |
| **Expiration Time** | `expired_at` | When the fact was superseded by new information |

---

## How Graphiti Works

### Episode-Based Ingestion Pipeline

```
Episode Content
      |
      v
[1. Entity Extraction] --> LLM with Pydantic docstrings as guidance
      |
      v
[2. Entity Resolution] --> Similarity search + LLM deduplication
      |
      v
[3. Edge Extraction] --> Relationships with temporal metadata
      |
      v
[4. Edge Resolution] --> Contradiction detection, invalidation
      |
      v
[5. Graph Storage] --> Neo4j with bi-temporal metadata
```

**Critical Insight:** Pydantic model docstrings ARE the extraction prompts. More detailed docstrings = better extraction.

### LLM Calls Per Episode

~10-20 LLM calls per episode ingestion:
- Entity extraction (1-3 calls)
- Entity classification (1 call)
- Entity deduplication (0-N calls)
- Attribute/summary extraction (N calls)
- Edge extraction (1-3 calls)
- Edge resolution (0-N calls)

**Cost:** ~$0.10-0.50 per 1000-word episode (Sonnet/GPT-4)

---

## Configuration Extension Points

### Ranked by Impact

| Config | Location | Impact | Complexity |
|--------|----------|--------|------------|
| **Entity type docstrings** | Pydantic models | **Highest** | Low |
| Custom extraction instructions | `add_episode()` | High | Low |
| Edge type docstrings | Pydantic models | High | Low |
| Edge type mapping | `PAA_EDGE_TYPE_MAP` | Medium | Low |
| LLM client | Constructor | Medium | Medium |
| Embedder | Constructor | Medium | Medium |
| Database backend | Constructor | Low | High |

### PRIMARY TUNING LEVER

```python
class Person(BaseModel):
    """
    ═══════════════════════════════════════════════════════════════════════════
    MANDATORY EXTRACTION RULES - ALWAYS type as Person:
    ═══════════════════════════════════════════════════════════════════════════

    1. [Pattern description]
       - Example: "Mike from Engineering" → Person(name="Mike")

    ═══════════════════════════════════════════════════════════════════════════
    DISAMBIGUATION RULES:
    ═══════════════════════════════════════════════════════════════════════════

    - [Rule 1]
    - [Rule 2]
    """
    role: Optional[str] = Field(description="Person's role")
```

---

## Current PAI Performance

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| **Type Accuracy** | 100% | 90% | ✅ Achieved |
| Entity F1 | 85-86% | 90% | Close (+11% from baseline) |
| Relationship F1 | 70-77% | 85% | Improved (+10% from baseline) |

Note: LLM extraction variance causes scores to fluctuate ±5% between runs.

---

## Key Limitations

### 1. LLM Extraction Variance
Same input can produce different extractions. Mitigation: detailed docstrings, post-processing validation.

### 2. Node Attribute Versioning Gap (Issue #1166)
Entity properties are destructively overwritten - historical attribute values lost.
**Workaround:** Store historical data in edges, not node properties.

### 3. Query Complexity
Temporal queries require bi-temporal predicates. Need helper functions.

### 4. Cost
~10-20 LLM calls per episode. Use bulk ingestion, smaller models where possible.

---

## Architecture Quality Assessment

| Aspect | Rating | Notes |
|--------|--------|-------|
| Code Organization | 9/10 | Clean separation, type hints throughout |
| Extensibility | 9/10 | Pluggable drivers, LLMs, embedders |
| Error Handling | 7/10 | Good, some gaps |
| Testing | 6/10 | Moderate coverage |
| Documentation | 7/10 | Good docstrings, limited examples |

---

## GitHub Roadmap Highlights

### Critical Issues for PAI
- **#1166** Node attribute versioning - historical data loss
- **#1164** "attributes" keyword in MCP - silent failures
- **#1143** Neo4j schema index error - startup crashes

### Planned Features
- Summary embeddings for semantic search (#1163)
- Configurable small model for cost reduction (#1135)
- Multi-language support (#1141)

---

## Recommended Next Steps

### Immediate (High Priority)
1. **Improve Relationship F1** - Enhance edge type docstrings
2. **Build temporal query helpers** - Abstract bi-temporal predicates
3. **Expand ground truth** - 10 → 50+ test cases

### Medium-Term
4. **Entity resolution cache** - Prevent disambiguation drift
5. **Domain-specific entity types** - Skill, Workflow, Command
6. **Post-processing validation** - Catch extraction errors

### Long-Term
7. **Confidence scoring** - Enable review workflows
8. **Graph visualization** - Neo4j Bloom or custom D3.js
9. **Hybrid storage** - Graphiti + vector store + SQLite

---

## Key Commands

```bash
# Ingest
python ~/.claude/tools/GraphitiIngest.py "Meeting with Mike..."

# Query
python ~/.claude/tools/GraphitiQuery.py search "Mike"
python ~/.claude/tools/GraphitiQuery.py stats
python ~/.claude/tools/GraphitiQuery.py timeline --days 7

# Tuning
python ~/.claude/tools/tuning/TuningLoop.py --compare
python ~/.claude/tools/tuning/TuningLoop.py --baseline

# Clear tuning cache (required after docstring changes)
cd ~/.claude/tools && source .venv/bin/activate && python -c "
import asyncio, os
from graphiti_core import Graphiti
from dotenv import load_dotenv
load_dotenv(os.path.expanduser('~/.claude/.env'))
async def clear():
    g = Graphiti(uri=os.getenv('NEO4J_URI'), user=os.getenv('NEO4J_USER'), password=os.getenv('NEO4J_PASSWORD'))
    async with g.driver.session() as s:
        await s.run('MATCH (n {group_id: \"paa-tuning-loop\"}) DETACH DELETE n')
    await g.close()
asyncio.run(clear())
"
```

---

## Key Files

```
~/.claude/tools/
├── GraphitiIngest.py           # Main ingestion script
├── GraphitiQuery.py            # Query interface
├── lib/
│   └── graphiti_types.py       # Custom entity/edge types (PRIMARY TUNING)
├── tuning/
│   ├── TuningLoop.py           # Evaluation framework
│   ├── ground_truth.json       # Test cases (10)
│   └── baseline_scores.json    # Current: 100% Type Accuracy
└── GRAPHITI_ARCHITECTURE.md    # Architecture reference
```

---

## Comparison: Graphiti vs Alternatives

| Feature | Graphiti | LangChain | LlamaIndex | GraphRAG |
|---------|----------|-----------|------------|----------|
| Temporal model | **Bi-temporal** | None | None | None |
| Incremental updates | **Real-time** | Batch | Batch | Batch |
| Entity resolution | LLM-assisted | Basic | Basic | Community |
| Custom entity types | **Pydantic** | Schema | Schema | Fixed |
| Cost per ingestion | Higher | Lower | Lower | Higher |

---

## Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| LLM rate limiting | High | Medium | Backoff, bulk ingestion |
| Extraction accuracy drift | Medium | High | Regression testing |
| Node versioning gap | High | Medium | Store history in edges |
| Graphiti breaking changes | Medium | Medium | Pin versions |
| Cost overruns | Medium | Medium | Monitor, smaller models |

---

## To Resume

Say: "Continue the Graphiti temporal KG work" or "What's next for Graphiti?"

**Full research document:** `~/.claude/MEMORY/research/2026-01/GRAPHITI_TEMPORAL_KG_DEEP_DIVE.md`
