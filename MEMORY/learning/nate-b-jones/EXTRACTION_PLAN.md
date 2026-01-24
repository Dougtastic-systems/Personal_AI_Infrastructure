# Nate B. Jones Content Extraction Plan

**Created:** 2026-01-23
**Status:** Ready for MVE execution
**Input:** 118 raw emails in `email-captures/`
**Output:** Structured extractions in `processed/`

---

## 1. Content Analysis Summary

After sampling 3 diverse raw emails (prompting methodology, predictions, product deep-dive), I identified these patterns:

### Content Types Observed
| Type | Description | Example |
|------|-------------|---------|
| **Predictions/Bets** | Forward-looking claims with supporting rationale | "Three structural shifts coming in 2026" |
| **Frameworks** | Mental models with application guidance | "Six stages of the prompt lifecycle" |
| **Product Reviews** | Deep dives on tools with usage patterns | "Claude Skills" feature analysis |
| **Prompt Kits** | Collections of ready-to-use prompts | "10 Super Prompts" with skill files |
| **Tutorials** | Step-by-step methodology | "How to build skills" instructions |

### Data Quality Issues
1. **Heavy formatting noise** - Blank lines, spacing characters, encoded URLs
2. **Substack boilerplate** - Watch/Read buttons, subscription CTAs, footer
3. **Confidentiality footer** - Cydcor email disclaimer (strip)
4. **Link encoding** - Substack redirect URLs not useful

---

## 2. Extraction Schema (v1)

```markdown
# [Original Title - Cleaned]

**Original:** [relative path to raw email]
**Date:** YYYY-MM-DD
**Type:** prediction | framework | product-review | prompt-kit | tutorial | field-notes
**Tags:** [comma-separated topic tags]

## Core Thesis
[1-3 sentences - the central argument or claim]

## Key Concepts
- **[Concept Name]**: [Definition/explanation in 1-2 sentences]
[Repeat for each concept]

## Mental Models
- **[Model Name]**: [How it works, when to apply]
[Optional - only if explicit frameworks presented]

## Predictions/Bets
- **[Prediction]**: [Supporting reasoning]
[Optional - only for prediction-type content]

## Tools & Products Mentioned
| Tool | Category | Nate's Take |
|------|----------|-------------|
| [Name] | [Category] | [Brief assessment] |

## Prompts/Resources Included
- **[Resource Name]**: [Brief description]
[Only if downloadable assets referenced]

## Quotable Lines
> "[Direct quote worth preserving]"
[2-3 max, only genuinely insightful]

## Cross-References
- **Related to:** [Other emails by topic similarity]
- **Builds on:** [Earlier concepts this extends]
- **Contradicts:** [If applicable]

## Personal Relevance (Doug-specific)
- **Applies to:** [Your projects/goals from TELOS]
- **Action items:** [What to do with this insight]

## Extraction Quality
- **Confidence:** high | medium | low
- **Gaps:** [What couldn't be extracted or was unclear]
```

---

## 3. MVE Design: 10 Email Extraction

### Email Selection (Diverse Sample)
1. **2025-11-24** - Prompting lifecycle (framework)
2. **2026-01-01** - Three structural shifts (predictions)
3. **2026-01-23** - Claude Skills (product-review)
4. **2026-01-23** - AI bets 2026 (predictions)
5. **2026-01-23** - Anthropic/Google/Vercel agents disagreement (analysis)
6. **2026-01-23** - ChatGPT 201 (tutorial)
7. **2026-01-23** - Claude Code agent attack (field-notes)
8. **2026-01-23** - 10x prompt power (prompt-kit)
9. **2026-01-23** - Scaling expertise (framework)
10. **2026-01-23** - Amazon layoffs (analysis)

### Extraction Process
```
For each email:
1. Strip boilerplate (headers, footers, CTAs, encoded URLs)
2. Identify content type
3. Extract schema fields
4. Rate extraction confidence
5. Note gaps/uncertainties
```

### Verification Checkpoints

#### Checkpoint 1: Structural Validity (After 3 emails)
- [ ] Schema fields populated consistently?
- [ ] Content type classification accurate?
- [ ] Cross-reference detection working?
- [ ] Confidence ratings calibrated?

#### Checkpoint 2: Content Quality (After 5 emails)
- [ ] Core thesis captures main argument?
- [ ] Key concepts are actually concepts (not just topics)?
- [ ] Quotable lines are genuinely insightful?
- [ ] Personal relevance is actionable?

#### Checkpoint 3: Full MVE Review (After 10 emails)
- [ ] Can answer "What did Nate say about [topic]?" using extractions?
- [ ] Cross-references form meaningful clusters?
- [ ] Schema has no consistently empty fields?
- [ ] Schema has no consistently overflowing fields?

---

## 4. Refinement Loops

### Loop 1: Extraction Quality Tuning
```
Extract 3 → Human review → Identify issues → Tune extraction prompt → Repeat
```
**Issues to watch:**
- Concept identification too granular or too broad
- Thesis extraction missing nuance
- Type classification ambiguity

### Loop 2: Schema Fitness
```
Extract 10 → Analyze field usage → Adjust schema → Re-extract sample
```
**Questions to answer:**
- What fields are consistently empty? (Remove or make optional)
- What information are we losing? (Add fields)
- What patterns emerge that schema doesn't capture?

### Loop 3: Cross-Reference Validation
```
Query by theme → Verify groupings → Refine tagging → Re-query
```
**Tests:**
- Do "prompting" articles cluster together?
- Do "predictions" form coherent threads?
- Can we trace concept evolution over time?

### Loop 4: Utility Validation
```
Ask real question → Retrieve using extractions → Evaluate answer quality
```
**Test questions:**
- "What's Nate's current position on AI agents?"
- "What prompting frameworks has he introduced?"
- "How has his thinking on AI review evolved?"

---

## 5. Extraction Prompt (v1)

```markdown
You are extracting structured knowledge from a Nate B. Jones newsletter email.

## Input
The raw email content (may contain formatting artifacts)

## Task
1. Strip all boilerplate (Substack CTAs, subscription prompts, encoded URLs, email footers)
2. Identify the content type: prediction | framework | product-review | prompt-kit | tutorial | field-notes
3. Extract into the schema below
4. Rate your confidence: high (clear content), medium (some interpretation), low (unclear)
5. Note any gaps where information was unclear or missing

## Schema
[Insert schema from Section 2]

## Quality Guidelines
- Core thesis: 1-3 sentences max, capture the central argument
- Key concepts: Must be actual concepts/terms, not just topics mentioned
- Quotable lines: Only genuinely insightful, max 3
- Personal relevance: Connect to Doug's goals (PAI infrastructure, security research, agentic systems)
- Confidence: Be honest about uncertainty
```

---

## 6. Success Criteria

The extraction pipeline is working when:

- [ ] Can answer "What did Nate say about [topic]?" in <30 seconds
- [ ] Can track concept evolution over time
- [ ] Cross-references surface non-obvious connections
- [ ] Extraction quality is consistent (>80% accuracy on spot checks)
- [ ] Schema fields are neither empty nor overflowing

---

## 7. Next Steps

1. **Now:** Run MVE extraction on 10 selected emails
2. **Checkpoint 1:** Review first 3 extractions, tune prompt
3. **Checkpoint 2:** Review 5 extractions, adjust schema if needed
4. **Checkpoint 3:** Full MVE review, decide go/no-go for scaling
5. **Scale:** If MVE passes, extract remaining 108 emails
6. **Future:** Build Graphiti graph from extractions (relational queries)

---

## 8. Open Decisions

| Decision | Options | Recommendation |
|----------|---------|----------------|
| Extraction model | Haiku (fast) vs Sonnet (quality) | Start with Sonnet for MVE, drop to Haiku for scale if quality holds |
| Incremental vs batch | Auto-process new emails vs manual batches | Manual for now, auto after pipeline validated |
| Storage format | Markdown files only vs SQLite + Markdown | Start with Markdown, add SQLite if queries need it |
| Human review level | Spot-check vs full review | Spot-check 10% after MVE validation |
