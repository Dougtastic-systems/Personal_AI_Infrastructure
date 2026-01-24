# Continuation: Graphiti Pipeline Design for Sustainable Learning

**Created:** 2026-01-24
**Status:** Active - Needs Design Decision
**Priority:** High (foundational infrastructure)

---

## Context

Building a knowledge graph from Nate B. Jones newsletters (and future content) using Graphiti + Neo4j. Initial testing revealed architecture insights that require strategic decisions before scaling.

### What We Learned This Session

**Graphiti's 5-LLM-Call Architecture (per chunk):**
1. `extract_nodes()` - Entity extraction
2. `resolve_extracted_nodes()` - Dedupe against existing graph
3. `extract_edges()` - Relationship extraction
4. `resolve_extracted_edges()` - Dedupe/invalidate edges
5. `extract_attributes_from_nodes()` - Enrich entities

**First Email Results (proof it works):**
- 117 entities, 83 relationships extracted
- 13 chunks × 5 LLM calls = ~65 API calls
- ~30 minutes processing time
- OpenAI gpt-4o-mini worked; Claude Haiku returned malformed JSON

**The Problem:** 113 emails × 30 min = 60 hours. Not viable for repeated use.

---

## Key Files

| File | Purpose |
|------|---------|
| `~/.claude/tools/BatchNateIngest.py` | Batch ingestion script (currently uses OpenAI) |
| `~/.claude/tools/lib/email_cleaner.py` | Substack boilerplate removal |
| `~/.claude/tools/graphiti-flow.html` | Visual diagram of LLM call flow |
| `~/.claude/tools/GRAPHITI_ARCHITECTURE.md` | Full system documentation |
| `~/.claude/tools/lib/graphiti_types.py` | PAA entity/edge type definitions |
| `~/.claude/MEMORY/learning/nate-b-jones/email-captures/` | 113 email files |

---

## Cost Analysis

### API Costs (per 1M tokens)

| Provider | Input | Output | JSON Reliability | Rate Limit |
|----------|-------|--------|------------------|------------|
| Claude Haiku 3 | $0.25 | $1.25 | Poor | 50K/min |
| GPT-4o-mini | $0.15 | $0.60 | Good | 200K/min |
| GPT-4o | $2.50 | $10.00 | Excellent | 30K/min |
| Local (Ollama) | $0 | $0 | Varies | Unlimited |

### Estimated Costs for Full 113-Email Batch

**With current architecture (5 calls/chunk, 600 total chunks):**
- OpenAI gpt-4o-mini: ~$2-5
- OpenAI gpt-4o: ~$30-50
- Local: $0 (electricity only)

**Cost is NOT the problem. Time is.**

---

## The Real Questions

### 1. Is Graphiti the Right Tool?

**Graphiti Strengths:**
- Bi-temporal data model (knows when facts were true vs when learned)
- Automatic entity resolution and deduplication
- Built-in edge invalidation (updates facts when they change)
- Production-ready Neo4j integration

**Graphiti Weaknesses:**
- 5 LLM calls per chunk (architected for accuracy over speed)
- Designed for real-time chat memory, not bulk ingestion
- No batch optimization in current version
- Heavy dependency on LLM JSON schema adherence

**Alternatives to Consider:**
- **LlamaIndex Knowledge Graph** - Simpler, fewer LLM calls
- **LangChain Graph Transformers** - More flexible
- **Custom extraction** - Build exactly what we need
- **Hybrid approach** - Use Graphiti for queries, simpler extraction for ingestion

### 2. What Quality Level Do We Need?

| Level | Description | Speed | Use Case |
|-------|-------------|-------|----------|
| High | Full Graphiti (5 calls) | Slow | Critical relationships |
| Medium | Extract + dedupe only (2 calls) | 2.5x faster | Most content |
| Low | Extract only (1 call) | 5x faster | Bulk historical |
| Batch | Custom parallel extraction | 10x faster | Initial load |

### 3. Local Model Requirements

**For Reliable JSON Schema Adherence:**

| Model | VRAM | Quality | Speed |
|-------|------|---------|-------|
| Qwen 2.5 72B | 48GB+ | Excellent | Slow |
| Qwen 2.5 32B | 24GB | Good | Medium |
| Llama 3.1 70B | 48GB+ | Good | Slow |
| Mistral 7B | 8GB | Poor JSON | Fast |

**Your Mac Options:**
- M1/M2 Max (32GB): Qwen 2.5 14B - marginal quality
- M1/M2 Ultra (64GB+): Qwen 2.5 32B - good quality
- External GPU (RTX 4090 24GB): Qwen 2.5 32B - good + fast

**Recommendation:** Local only viable with 24GB+ unified/VRAM

### 4. Pipeline Architecture Options

**Option A: Keep Graphiti, Optimize Time**
```
[Emails] → [Larger Chunks 8K] → [Graphiti w/ gpt-4o-mini] → [Neo4j]
                                        ↓
                              Run overnight/background
```
- Pro: Full Graphiti quality
- Con: Still 20+ hours for full batch

**Option B: Two-Phase Pipeline**
```
Phase 1 (Fast): [Emails] → [Simple Extract 1 call] → [Staging DB]
Phase 2 (Slow): [Staging] → [Graphiti Resolve/Dedupe] → [Neo4j]
```
- Pro: Get entities fast, dedupe later
- Con: More complex, staging storage needed

**Option C: Custom Extraction + Graphiti Queries**
```
[Emails] → [Custom LLM Extract] → [Direct Neo4j Write]
                                         ↓
                              [Graphiti for Queries Only]
```
- Pro: 5x faster ingestion
- Con: Lose bi-temporal model, manual deduplication

**Option D: Hybrid Local + Cloud**
```
[Emails] → [Local Qwen for Extract] → [Cloud for Resolve] → [Neo4j]
```
- Pro: Balance cost/quality
- Con: Complex setup, still need good GPU

---

## Recommended Exploration Path

### Phase 1: Understand Your Hardware
- [ ] Check available VRAM/unified memory
- [ ] Test Ollama with Qwen 2.5 (largest that fits)
- [ ] Benchmark local JSON reliability on Graphiti prompts

### Phase 2: Design Experiments
- [ ] Test Option B (two-phase) with 10 emails
- [ ] Test Option C (custom extract) with 10 emails
- [ ] Compare entity quality between approaches

### Phase 3: Make Architecture Decision
- [ ] Choose primary pipeline based on results
- [ ] Define "good enough" quality threshold
- [ ] Design incremental ingestion for new content

### Phase 4: Build Production Pipeline
- [ ] Implement chosen architecture
- [ ] Add error handling and resumability
- [ ] Create monitoring/progress tracking
- [ ] Document for future use

---

## Questions to Answer

1. **What's the minimum viable entity quality?** (Can we live with 80% vs 95%?)
2. **How often will you ingest new content?** (Daily newsletters vs occasional batches)
3. **What queries matter most?** (This determines if we need full Graphiti features)
4. **What hardware do you have available?** (Determines local feasibility)
5. **Is this foundational infrastructure or experimental?** (Determines investment level)

---

## Commands to Resume

```bash
# Check your GPU/memory
system_profiler SPDisplaysDataType
sysctl hw.memsize

# Test Ollama
ollama pull qwen2.5:14b
ollama run qwen2.5:14b "Extract entities from: John works at Anthropic on Claude. Return JSON."

# Run Graphiti with OpenAI (current working config)
cd ~/.claude/tools
source .venv/bin/activate
python BatchNateIngest.py --limit 5 --delay 30

# View the flow diagram
open ~/.claude/tools/graphiti-flow.html
```

---

## Session Notes

- Claude Haiku doesn't work with Graphiti (JSON schema issues)
- OpenAI gpt-4o-mini works and is cheapest
- First email: 117 entities, 83 edges (quality is good)
- Bottleneck is time (5 LLM calls × 600 chunks), not cost ($2-5 total)
- Need to decide: optimize Graphiti OR build simpler custom pipeline

---

**Next Session:** Start with "Continue graphiti-pipeline-design" to pick up this exploration.
