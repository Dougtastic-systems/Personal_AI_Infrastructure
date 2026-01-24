---
capture_type: LEARNING
timestamp: 2026-01-21 14:20:29 PST
auto_captured: true
tags: [auto-capture]
---

# Quick Learning: Root cause is three failure modes. Entity type definitions need better extraction rules for teams, quarters, implicit projects.

**Date:** 2026-01-21
**Auto-captured:** Yes (use /capture-learning for detailed narrative)

---

## Summary

Deep analysis reveals the 1.4% F1 regression stems from three distinct failure modes: under-extraction of implicit entities, type classification gaps, and over-extraction in currency tests.

## Analysis

## Root Causes

## Actions Taken

N/A

## Results

Identified 3 failure modes explaining the regression

## Current Status

Analysis complete, awaiting implementation decisions

## Next Steps

1. Implement quick wins in entity type definitions (highest ROI)

---

## Notes

This is an automatically captured learning moment. For a more detailed narrative with:
- The full problem-solving journey
- What we initially thought vs. what was true
- Detailed troubleshooting steps
- Comprehensive lesson learned

Use: `/capture-learning` to create a full learning document.

---

## Full Response

<details>
<summary>Click to view full response</summary>

📋 SUMMARY: Deep analysis reveals the 1.4% F1 regression stems from three distinct failure modes: under-extraction of implicit entities, type classification gaps, and over-extraction in currency tests.

🔍 ANALYSIS:

## Root Causes

### 1. Under-Extraction (11 missing entities)

| Category | Missing | Root Cause |
|----------|---------|------------|
| **Implicit Projects** | "new API", "migration", "ML pipeline" | LLM doesn't recognize noun phrases as projects without explicit "project" keyword |
| **Department Names** | "Legal", "Engineering" | Appear as prepositional context ("from Legal") not standalone nouns |
| **Quarter References** | "Q3 2026", "Q2 2026" | Not recognized as Events/deadlines - appear as temporal modifiers |
| **Generic Entities** | "vendor", "staging", "#incidents" | Too contextual - LLM treats as descriptive rather than named entities |

### 2. Type Misclassifications (3 entities)

| Entity | Expected | Got | Why |
|--------|----------|-----|-----|
| "contract" | Concept | Unknown | No specific label - only has `["Entity"]` |
| "Platform division" | Organization | Unknown | "division" pattern not recognized |
| "DevOps team" | Organization | Unknown | "team" pattern not recognized |

**Root cause:** The `Organization` entity type docstring doesn't mention internal divisions/teams as valid organizations.

### 3. Over-Extraction in TC002

Latest run extracted 9 entities vs. expected 5:
- **Extra:** Phase 1, Phase 2, "the full rollout", "reserve fund"
- **Precision dropped:** 100% → 55.5%
- **F1 impact:** 100% → 71.4% (a 28.6% drop on this single test)

This is LLM non-determinism - Graphiti sometimes extracts Project entities for phases.

---

⚡ ACTIONS RECOMMENDED:

### Quick Wins (Improve by ~3-5%)

**1. Update `Organization` entity type** (`lib/graphiti_types.py:193`):
```python
"""
EXTRACTION RULES:
...
- Internal teams/divisions: "DevOps team", "Platform division", "Legal", "Engineering"
- Pattern: "[Name] team" or "[Name] division" = Organization
- Department names when used with "from [Dept]" pattern
"""
```

**2. Update `Event` entity type** (`lib/graphiti_types.py:219`):
```python
"""
EXTRACTION RULES:
...
- Quarter references as deadlines: "Q1 2026", "Q3 2025" → Event (event_type: deadline)
- Named events: "AWS re:Invent 2025", "conference" → Event
"""
```

**3. Update `Project` entity type** (`lib/graphiti_types.py:93`):
```python
"""
EXTRACTION RULES:
- Explicit projects: "Phoenix Framework", "Prometheus project"
- Implicit projects (things people work on/own):
  - "the new API", "the migration", "ML pipeline"
  - Pattern: "work on the [X]" → X is likely a Project
  - Pattern: "own the [X]" → X is likely a Project
"""
```

### Medium-Term (Better Preprocessor)

**4. Add department normalization** to preprocessor:
```python
# "from Legal" → "from the Legal department"
text = re.sub(r'\bfrom (Legal|Engineering|Sales|HR|Finance|Marketing)\b',
              r'from the \1 department', text, flags=re.IGNORECASE)
```

**5. Add quarter normalization**:
```python
# "Q3 2026" → "Q3 2026 deadline"
text = re.sub(r'\b(Q[1-4]\s+\d{4})\s+(deadline|target|goal)',
              r'\1 deadline', text)
```

### Ground Truth Adjustments

Consider whether these expectations are realistic:
- "vendor" as Organization → might be too generic to reliably extract
- "staging" as Location → could legitimately be Concept or Location
- "conference" without a name → might be too generic

---

✅ RESULTS: Identified 3 failure modes explaining the regression

📊 STATUS: Analysis complete, awaiting implementation decisions

➡️ NEXT: 
1. Implement quick wins in entity type definitions (highest ROI)
2. Run `--baseline` after changes to lock in improvements
3. Add new test cases for edge cases discovered

📖 STORY EXPLANATION:
1. The 1.4% F1 drop comes from three distinct failure modes, not a single issue
2. Under-extraction hits implicit Projects most heavily (3 missed: new API, migration, ML pipeline)
3. Department names fail because they appear in prepositional phrases ("from Legal") not as subjects
4. Quarter references like "Q3 2026" aren't being recognized as temporal Events
5. Type misclassification happens when "team" or "division" patterns aren't recognized as Organizations
6. TC002 shows LLM non-determinism - sometimes extracts "Phase 1" as Project, sometimes doesn't
7. Quick wins: Update entity type docstrings with clearer extraction rules and examples
8. The preprocessor helps with currency but doesn't address the structural extraction gaps

⭐ RATE (1-10): 

🗣️ NeonBrain: Root cause is three failure modes. Entity type definitions need better extraction rules for teams, quarters, implicit projects.

</details>
