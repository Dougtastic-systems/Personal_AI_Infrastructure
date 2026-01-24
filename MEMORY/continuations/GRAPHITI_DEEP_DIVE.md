# Continuation: Graphiti Deep Dive for PAI Memory Optimization

**Created:** 2026-01-21
**Updated:** 2026-01-21 15:10 PST
**Status:** Type Classification Complete - 100% Type Accuracy Achieved
**Priority:** High - foundational to memory capture

---

## Context Summary

I'm continuing work on the PAI Graphiti knowledge graph system. Here's the context:

### Current State (Post-Tuning)
- Location: ~/.claude/tools/
- **Type Accuracy: 100%** ✅ (up from 92.8%)
- Entity F1: ~83-86% (varies due to LLM extraction variance)
- Relationship F1: ~65-70%
- 10 test cases in ground_truth.json
- All 5 previous type misclassifications FIXED

### Session 2026-01-21 Accomplishments
1. Fixed "contract" → now correctly typed as Concept
2. Fixed "Platform division" → now correctly typed as Organization
3. Fixed "DevOps team" → now correctly typed as Organization
4. Fixed "migration" → now correctly typed as Project
5. Fixed "ML pipeline" → now correctly typed as Project
6. Discovered cache issue: tuning group needs clearing between docstring changes
7. Identified LLM extraction variance as cause of F1 fluctuation

### Key Files
1. `CaptureIngest.ts` - Entry point, file watching, chunking, spawns Python
2. `GraphitiIngest.py` - Core Graphiti integration, add_episode() calls
3. `lib/graphiti_types.py` - PAA_ENTITY_TYPES (**PRIMARY TUNING LEVER**) - ENHANCED
4. `lib/preprocessor.py` - Text normalization pipeline (currency, abbreviations)
5. `tuning/TuningLoop.py` - Evaluation framework with 10 test cases
6. `tuning/ground_truth.json` - Test cases with expected entities/relationships
7. `tuning/baseline_scores.json` - New baseline with 100% type accuracy

### Data Flow
```
Capture Sources --> CaptureIngest.ts --> Preprocessing --> GraphitiIngest.py --> Neo4j
     |                   |                    |                    |
     v                   v                    v                    v
Voice/Chat/Drop    Speaker-aware        Currency/Time         Entity/Edge
                   Chunking             Normalization          Extraction
```

### Primary Tuning Lever
The **docstrings** in graphiti_types.py Pydantic models are passed directly to the LLM during extraction. The enhanced docstrings now include:
- Mandatory extraction rules with explicit patterns
- Disambiguation sections (e.g., Project vs Concept)
- Pattern detection examples
- CORRECT/WRONG extraction examples

### Tuning Knobs (Ranked by Impact)
1. Entity Type Docstrings (HIGHEST) - lib/graphiti_types.py - **OPTIMIZED**
2. Preprocessor Pipeline (HIGH) - lib/preprocessor.py
3. Entity Type Attributes (MEDIUM) - Field() definitions
4. Edge Type Mapping (MEDIUM) - PAA_EDGE_TYPE_MAP
5. Chunking Configuration (LOW-MEDIUM) - CaptureIngest.ts CHUNK_CONFIG

---

## Current Performance

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Type Accuracy | 92.8% | **100.0%** | +7.2% ✅ |
| Entity F1 | 88.3% | ~83-86% | -2-5% (LLM variance) |
| Relationship F1 | 68.7% | ~65-70% | Similar |

### Important Discovery: Cache Clearing
The tuning group (`paa-tuning-loop`) caches entities. After changing docstrings, you MUST clear the cache:
```python
# Clear tuning group cache
async with driver.session() as session:
    await session.run('MATCH (n {group_id: "paa-tuning-loop"}) DETACH DELETE n')
```

### Missing Extractions (Persistent - Generic Terms)
These are hard to extract due to their generic nature:
- "conference" (Event) - TC004
- "vendor" (Organization) - TC006
- "staging" (Location) - TC006
- "#incidents" (Location) - TC008

---

## Quick Reference Commands

```bash
# Run tuning loop with comparison
python ~/.claude/tools/tuning/TuningLoop.py --compare --verbose

# Save new baseline after improvements
python ~/.claude/tools/tuning/TuningLoop.py --baseline

# Clear tuning cache (REQUIRED after docstring changes)
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

# Query the graph
python ~/.claude/tools/GraphitiQuery.py stats
python ~/.claude/tools/GraphitiQuery.py search "event sourcing"

# Test preprocessor
python -c "from lib.preprocessor import preprocess_text; print(preprocess_text('$50k budget by EOD'))"
```

---

## Architectural Documentation

Full architecture analysis saved at:
`~/.claude/tools/GRAPHITI_ARCHITECTURE.md`

Contains:
- Mermaid architecture diagram
- Component inventory with file locations
- Data flow documentation
- Configuration matrix
- All extension points

---

## Suggested Next Steps

1. **Improve Relationship F1** - Currently ~65-70%, enhance edge type docstrings
2. **Domain-specific entity types** - Add PAI-specific types (Skill, Command, Workflow)
3. **Entity resolution cache** - Prevent re-extraction drift across sessions
4. **Address LLM extraction variance** - Consider multi-pass extraction or confidence thresholds
5. **Improve generic entity extraction** - Better prompts for "conference", "vendor", etc.

---

## Docstring Enhancement Pattern (What Worked)

The key to improving type accuracy was restructuring docstrings with:

```python
class EntityType(BaseModel):
    """
    [Brief description]

    ═══════════════════════════════════════════════════════════════════════════
    MANDATORY EXTRACTION RULES - ALWAYS type as [EntityType]:
    ═══════════════════════════════════════════════════════════════════════════

    1. [Pattern] → EntityType
       - Example: "X" → EntityType(name="X")

    ═══════════════════════════════════════════════════════════════════════════
    [TYPE] vs [OTHER TYPE] DISAMBIGUATION:
    ═══════════════════════════════════════════════════════════════════════════

    - [Rule for this type]
    - [Rule for other type]
    """
```

---

## To Resume

Say: "Continue the Graphiti deep dive" or "Load GRAPHITI_DEEP_DIVE continuation"
