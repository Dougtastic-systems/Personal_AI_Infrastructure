---
capture_type: LEARNING
timestamp: 2026-01-21 14:26:04 PST
auto_captured: true
tags: [auto-capture]
---

# Quick Learning: Entity F1 improved 3.2 percent to 89.2. Recall up 9.5 percent. Four missing entities remain.

**Date:** 2026-01-21
**Auto-captured:** Yes (use /capture-learning for detailed narrative)

---

## Summary

Quick wins implemented successfully - Entity F1 improved from 86.0% to 89.2% (+3.2%).

## Analysis

## Improvement Results

## Actions Taken

Updated 3 entity type definitions in `lib/graphiti_types.py`:

## Results

- **+3.2% Entity F1** (86.0% → 89.2%)

## Current Status

Quick wins complete. Further improvements would require deeper Graphiti modifications.

## Next Steps

1. Run `--baseline` to lock in these improvements as new baseline

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

📋 SUMMARY: Quick wins implemented successfully - Entity F1 improved from 86.0% to 89.2% (+3.2%).

🔍 ANALYSIS:

## Improvement Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Entity F1** | 86.0% | 89.2% | **+3.2%** |
| Entity Precision | 88.6% | 86.2% | -2.4% |
| Entity Recall | 83.5% | 93.0% | **+9.5%** |
| Type Accuracy | 94.2% | 92.9% | -1.2% |
| Relationship F1 | 74.8% | 77.5% | +2.7% |

## What Improved

| Test | Before | After | Fixed |
|------|--------|-------|-------|
| TC001 | 85.7% | 100% | "new API" now extracted as Project |
| TC002 | 71.4% | 100% | No more over-extraction of Phase 1/2 |
| TC003 | 80.0% | 100% | "Legal" and "Engineering" extracted |
| TC005 | 85.7% | 88.9% | "Q3 2026" now extracted as Event |
| TC010 | 77.8% | 90.0% | "Q2 2026" now extracted as Event |

## Remaining Issues (4 missing entities)

| Entity | Type | Why Still Missing |
|--------|------|-------------------|
| "conference" | Event | Too generic without a name |
| "vendor" | Organization | Generic reference |
| "staging" | Location | Ambiguous (environment vs location) |
| "#incidents" | Location | Slack channel format not recognized |

## Type Classification Still Struggling

- "Platform division" / "DevOps team" → Unknown (not Organization)
- "migration" / "ML pipeline" → Unknown or Concept (not Project)

The docstring improvements helped with **extraction** but not **type classification**. This is expected - Graphiti's type inference happens at a different stage.

⚡ ACTIONS: Updated 3 entity type definitions in `lib/graphiti_types.py`:
- Organization: Added team/division/department patterns (lines 193-215)
- Event: Added quarter reference patterns (lines 219-248)
- Project: Added implicit project patterns (lines 93-129)

✅ RESULTS: 
- **+3.2% Entity F1** (86.0% → 89.2%)
- **+9.5% Recall** (83.5% → 93.0%)
- Missing extractions reduced from 10 → 4
- Trade-off: Slight precision drop as model extracts more entities

📊 STATUS: Quick wins complete. Further improvements would require deeper Graphiti modifications.

➡️ NEXT: 
1. Run `--baseline` to lock in these improvements as new baseline
2. For continuation: Deep dive into Graphiti server architecture for PAI memory capture optimization

📖 STORY EXPLANATION:
1. Updated Organization entity type with explicit patterns for teams, divisions, and departments
2. Updated Event entity type with quarter reference patterns like "Q3 2026" as deadlines
3. Updated Project entity type with implicit project patterns for things people "work on" or "own"
4. Ran tuning loop - Entity F1 jumped 3.2% from 86.0% to 89.2%
5. Recall improved dramatically (+9.5%) as model now catches more entities
6. Missing extractions reduced from 10 to 4 - mostly generic entities remaining
7. Type classification still struggles with organizational subdivisions - needs deeper Graphiti changes
8. Ready for next phase: understanding Graphiti server core for further PAI memory optimization

⭐ RATE (1-10): 

🗣️ NeonBrain: Entity F1 improved 3.2 percent to 89.2. Recall up 9.5 percent. Four missing entities remain.

</details>
