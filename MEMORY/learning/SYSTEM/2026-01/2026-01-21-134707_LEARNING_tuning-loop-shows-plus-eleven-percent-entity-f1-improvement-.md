---
capture_type: LEARNING
timestamp: 2026-01-21 13:47:07 PST
auto_captured: true
tags: [auto-capture]
---

# Quick Learning: Tuning loop shows plus eleven percent entity F1 improvement. Relationship extraction at forty-six percent needs focus.

**Date:** 2026-01-21
**Auto-captured:** Yes (use /capture-learning for detailed narrative)

---

## Summary

Graphiti tuning loop completed with significant improvements over baseline.

## Analysis

- **Entity F1 improved**: 74.6% → 85.6% (+11.0%)

## Actions Taken

- Ran 10 test cases covering names, currency, disambiguation, dates, tasks, technical concepts, locations, hierarchy, and stress tests

## Results

| Metric | Score |

## Current Status

Tuning showing strong progress. Entity extraction solid, relationship extraction needs work.

## Next Steps

1. Add test cases for the missing entity patterns (Slack channels like #incidents, implicit orgs like "Legal")

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

📋 SUMMARY: Graphiti tuning loop completed with significant improvements over baseline.

🔍 ANALYSIS:
- **Entity F1 improved**: 74.6% → 85.6% (+11.0%)
- **Type Accuracy improved**: 90.8% → 94.2% (+3.3%)
- Preprocessor successfully transforming currency ($50k → $50,000) and task markers
- 10/10 test cases passing threshold

⚡ ACTIONS:
- Ran 10 test cases covering names, currency, disambiguation, dates, tasks, technical concepts, locations, hierarchy, and stress tests

✅ RESULTS:

| Metric | Score |
|--------|-------|
| Entity Precision | 92.2% |
| Entity Recall | 81.0% |
| Entity F1 | 85.6% |
| Type Accuracy | 94.2% |
| Relationship F1 | 46.4% |

**Remaining Issues:**
- 11 missing extractions (e.g., "new API", "Legal", "Engineering", "staging", "#incidents")
- 3 type misclassifications (contract, Platform division, DevOps team → Unknown)
- LLM returning invalid duplicate_facts indices (minor bug)

📊 STATUS: Tuning showing strong progress. Entity extraction solid, relationship extraction needs work.

➡️ NEXT:
1. Add test cases for the missing entity patterns (Slack channels like #incidents, implicit orgs like "Legal")
2. Improve type classification for organizational subunits
3. Investigate the duplicate_facts index bug in the LLM response parsing
4. Consider adding relationship-focused test cases to improve the 46.4% F1

🗣️ NeonBrain: Tuning loop shows plus eleven percent entity F1 improvement. Relationship extraction at forty-six percent needs focus.

</details>
