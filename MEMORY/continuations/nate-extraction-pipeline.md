# Continuation: Brain Factory - Extraction Pipeline Design

**Created:** 2026-01-23
**Updated:** 2026-01-23 (design complete)
**Status:** Ready for MVE execution
**Depends on:** nate-historical-processing.md (bulk capture complete)
**Output:** `MEMORY/learning/nate-b-jones/EXTRACTION_PLAN.md`

---

## Resume Prompt

```
Design the Nate content extraction pipeline.

Context:
- 118 raw email captures in MEMORY/learning/nate-b-jones/email-captures/
- Goal: Extract structured meaning, not just store text
- Two paths to consider: file-based processing vs Graphiti knowledge graph
- Need: Refinement loops, verification, cross-cutting theme extraction

Questions to answer:
1. What schema/structure should extracted knowledge have?
2. How do we verify extraction quality?
3. How do file-based extraction and Graphiti complement each other?
4. What's the minimal viable extraction that proves the approach?

Read sample emails first: ls ~/.claude/MEMORY/learning/nate-b-jones/email-captures/ | head -5
Then: Design the extraction architecture
```

---

## The Problem

Raw emails are **data**, not **knowledge**. We need to transform:

```
118 raw emails (data)
       ↓
Structured extractions (information)
       ↓
Cross-referenced insights (knowledge)
       ↓
Actionable patterns (wisdom)
```

---

## Two Complementary Approaches

### 1. File-Based Extraction (Immediate, Searchable)

**What:** Process each email → structured markdown with extracted fields
**Where:** `MEMORY/learning/nate-b-jones/processed/`
**Why:** Fast, grep-able, human-readable, no infra needed

Potential schema:
```markdown
# [Title]

**Original:** [link to raw email]
**Date:** YYYY-MM-DD
**Type:** newsletter | executive-briefing | prompt-kit | field-notes

## Core Thesis
[1-2 sentences - the main argument]

## Key Concepts
- **Concept Name**: Definition/explanation
- **Concept Name**: Definition/explanation

## Mental Models
- **Model Name**: How it works, when to apply

## Entities Mentioned
- People: [names]
- Companies: [names]
- Tools: [names]

## Prompts Included
- [prompt name]: [brief description]

## Cross-References
- Related to: [other processed files]
- Builds on: [earlier concepts]
- Contradicts: [if applicable]

## Personal Relevance
- Applies to: [your projects/goals]
- Action items: [what to do with this]
```

### 2. Graphiti Knowledge Graph (Relational, Temporal)

**What:** Entities and relationships in Neo4j via Graphiti
**Where:** Local Neo4j instance
**Why:** Query "what did Nate say about X over time?", track concept evolution

Graph structure:
```
(Newsletter)-[:PUBLISHED_ON]->(Date)
(Newsletter)-[:CONTAINS]->(Concept)
(Newsletter)-[:MENTIONS]->(Person|Company|Tool)
(Concept)-[:RELATED_TO]->(Concept)
(Concept)-[:EVOLVED_FROM]->(Concept)  // temporal
```

---

## Refinement & Verification Loops

### Loop 1: Extraction Quality
```
Extract 5 emails → Human review → Tune extraction prompt → Repeat
```
- Are concepts correctly identified?
- Is the thesis accurate?
- Are cross-references meaningful?

### Loop 2: Schema Fitness
```
Process 20 emails → Analyze gaps → Adjust schema → Reprocess
```
- What fields are consistently empty?
- What information are we losing?
- What patterns emerge that schema doesn't capture?

### Loop 3: Cross-Cutting Validation
```
Query by theme → Verify groupings → Refine tagging → Re-query
```
- Do "agents" articles actually cluster together?
- Are temporal evolutions tracked correctly?
- Can we answer "what changed in Nate's view on X?"

### Loop 4: Utility Validation
```
Ask real question → System retrieves → Evaluate answer quality → Tune
```
- "What's Nate's current position on AI agents?"
- "What prompts has he shared for X?"
- "How has his thinking on Y evolved?"

---

## Minimal Viable Extraction (MVE)

**Goal:** Prove the approach works before scaling

1. **Sample:** 10 emails (mix of types)
2. **Extract:** Using candidate schema
3. **Verify:** Human review of extractions
4. **Query:** 3 test questions
5. **Evaluate:** Can we answer them?

If MVE works → Scale to all 118
If MVE fails → Identify what broke, adjust, retry

---

## Open Questions

1. **Extraction model:** Haiku (fast/cheap) vs Sonnet (better quality)?
2. **Incremental vs batch:** Process new emails automatically or manual batches?
3. **Graphiti timing:** Build graph from extractions, or extract into graph directly?
4. **Human-in-loop:** How much review is sustainable?
5. **Storage format:** Markdown files vs SQLite vs both?

---

## Success Criteria

The pipeline is working when:
- [ ] Can answer "What did Nate say about [topic]?" in <30 seconds
- [ ] Can track concept evolution over time
- [ ] Cross-references surface non-obvious connections
- [ ] New emails are processed automatically
- [ ] Extraction quality is consistent (>80% accuracy on spot checks)

---

## Progress Log

### 2026-01-23: Design Complete
- Sampled 3 diverse emails (prompting methodology, predictions, product deep-dive)
- Identified content types: prediction, framework, product-review, prompt-kit, tutorial, field-notes
- Designed extraction schema with 12 structured fields
- Created MVE plan targeting 10 diverse emails
- Defined 4 verification checkpoints and refinement loops
- Full extraction plan written to `EXTRACTION_PLAN.md`

**Next Step:** Execute MVE on 10 selected emails

---

## Resume Prompt (Updated)

```
Execute MVE extraction on 10 Nate B. Jones emails.

Context:
- Extraction plan complete: MEMORY/learning/nate-b-jones/EXTRACTION_PLAN.md
- Raw emails: MEMORY/learning/nate-b-jones/email-captures/
- Output: MEMORY/learning/nate-b-jones/processed/

Tasks:
1. Extract first 3 emails (Checkpoint 1)
2. Review structural validity, adjust if needed
3. Extract next 2 emails (Checkpoint 2)
4. Review content quality, adjust schema if needed
5. Complete remaining 5 emails (Checkpoint 3)
6. Run utility validation with test questions
7. Decide go/no-go for scaling to all 118

Use extraction prompt from EXTRACTION_PLAN.md Section 5.
```

---

## Related Files

- Raw captures: `MEMORY/learning/nate-b-jones/email-captures/`
- Graphiti continuation: `continuations/GRAPHITI_TEMPORAL_KG.md`
- Brain Factory index: `MEMORY/brain-factory/INDEX.md`
- _NATE skill: `skills/_NATE/SKILL.md`
