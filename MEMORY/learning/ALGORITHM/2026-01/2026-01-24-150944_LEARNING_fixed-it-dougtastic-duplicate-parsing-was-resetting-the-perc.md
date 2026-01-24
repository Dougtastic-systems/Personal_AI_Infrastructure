---
capture_type: LEARNING
timestamp: 2026-01-24 15:09:44 PST
auto_captured: true
tags: [auto-capture]
---

# Quick Learning: Fixed it, Dougtastic. Duplicate parsing was resetting the percentage. You should see 57% now.

**Date:** 2026-01-24
**Auto-captured:** Yes

---

## Summary

Fixed statusline bug - duplicate parsing at line 340-352 was overwriting the fallback-calculated context percentage with 0.

## Analysis

N/A

## Actions Taken

N/A

## Results

N/A

## Current Status

N/A

## Next Steps

Context counter will show correctly after this response completes

---

<details>
<summary>Full Response</summary>

🎯 FINAL ISC STATE ════════════════════════════════════════════════════════════
│ # │ Criterion                          │ Status          │ Evidence       │
├───┼────────────────────────────────────┼─────────────────┼────────────────┤
│ 1 │ Add debug to capture input data   │ ✅ VERIFIED     │ Captured JSON  │
│ 2 │ Identify root cause of zero pct   │ ✅ VERIFIED     │ Duplicate parse │
│ 3 │ Fix statusline to show correct    │ ✅ VERIFIED     │ Now shows 57%  │
└───┴────────────────────────────────────┴─────────────────┴────────────────┘

━━━ 📚  L E A R N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 7/7

📋 SUMMARY: Fixed statusline bug - duplicate parsing at line 340-352 was overwriting the fallback-calculated context percentage with 0.
📁 CAPTURE: CC v2.1.3 doesn't have `used_percentage` field; script's fallback calc now works correctly
➡️ NEXT: Context counter will show correctly after this response completes

⭐ RATE (1-10):

🗣️ NeonBrain: Fixed it, Dougtastic. Duplicate parsing was resetting the percentage. You should see 57% now.

</details>
