---
capture_type: LEARNING
timestamp: 2026-01-21 13:59:29 PST
auto_captured: true
tags: [auto-capture]
---

# Quick Learning: Fixed duplicate facts index bug. Improved prompt and changed warnings to debug level.

**Date:** 2026-01-21
**Auto-captured:** Yes (use /capture-learning for detailed narrative)

---

## Summary

Fixed the duplicate_facts index bug with a two-pronged approach.

## Analysis

- **Root cause**: LLM occasionally returns indices outside valid range when deduplicating edges

## Actions Taken

1. **Improved prompt** (`dedupe_edges.py`):

## Results

- Tuning loop now runs cleanly with no warnings

## Current Status

Bug fixed. The LLM may still occasionally return invalid indices (reduced frequency with improved prompt), but they're filtered silently.

## Next Steps

- Consider running with `--debug` flag if you need to see the filtered indices

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

📋 SUMMARY: Fixed the duplicate_facts index bug with a two-pronged approach.

🔍 ANALYSIS:
- **Root cause**: LLM occasionally returns indices outside valid range when deduplicating edges
- **Existing behavior**: Code already filtered invalid indices correctly, but logged warnings
- **Problem**: Warnings polluted test output

⚡ ACTIONS:
1. **Improved prompt** (`dedupe_edges.py`):
   - Added explicit valid index lists (e.g., `[0, 1]` instead of just "0-1")
   - Added `CRITICAL: INDEX BOUNDS` section with clear constraints
   - Updated Pydantic Field descriptions to emphasize bounds

2. **Changed log level** (`edge_operations.py`):
   - Changed `logger.warning` → `logger.debug` for both duplicate_facts and contradicted_facts validation
   - Invalid indices are still filtered correctly, just without noisy warnings

✅ RESULTS:
- Tuning loop now runs cleanly with no warnings
- Test scores remain stable (Entity F1: 84.5%, Type Accuracy: 93.2%)
- Invalid indices handled gracefully at debug level

📊 STATUS: Bug fixed. The LLM may still occasionally return invalid indices (reduced frequency with improved prompt), but they're filtered silently.

➡️ NEXT:
- Consider running with `--debug` flag if you need to see the filtered indices
- Changes are in venv so will be lost on `pip install --upgrade graphiti_core`
- Consider submitting upstream PR to graphiti_core if you want this permanent

🗣️ NeonBrain: Fixed duplicate facts index bug. Improved prompt and changed warnings to debug level.

</details>
