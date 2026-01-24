---
capture_type: LEARNING
timestamp: 2026-01-24 15:07:16 PST
auto_captured: true
tags: [auto-capture]
---

# Quick Learning: Zero percent is expected at session start, Dougtastic. Known bug also undercounts overhead. Use /context for accuracy.

**Date:** 2026-01-24
**Auto-captured:** Yes

---

## Summary

Context counter shows 0% at session start (expected) and has a known bug that excludes system overhead.

## Analysis

N/A

## Actions Taken

N/A

## Results

N/A

## Current Status

N/A

## Next Steps

Continue conversation and check if percentage increases, or run `/context` for accurate reading

---

<details>
<summary>Full Response</summary>

━━━ ✅  V E R I F Y ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 6/7

🎯 FINAL ISC STATE ════════════════════════════════════════════════════════════
│ # │ Criterion                          │ Status          │ Evidence       │
├───┼────────────────────────────────────┼─────────────────┼────────────────┤
│ 1 │ Statusline script works correctly  │ ✅ VERIFIED     │ Test shows 25% bar │
│ 2 │ Root cause of 0% identified        │ ✅ VERIFIED     │ Known limitation │
└───┴────────────────────────────────────┴─────────────────┴────────────────┘

━━━ 📤  O U T P U T ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 6.5/7

## Root Cause: Expected Behavior + Known Bug

**Why 0% shows:**

1. **At session start** - `used_percentage` is 0 or null because no conversation tokens have been consumed yet. This is **expected behavior**.

2. **Known limitation** ([Issue #17959](https://github.com/anthropics/claude-code/issues/17959)) - Claude Code's `used_percentage` field **excludes system overhead**:
   - Tool definitions
   - CLAUDE.md files  
   - MCP server configs
   - System prompt

   This can cause a ~19% discrepancy between status line and actual usage.

## Current Status

| What | Shows |
|------|-------|
| Your CC version | 2.1.3 |
| Bug status | Open, no fix yet |
| Workaround | Use `/context` for accurate reading |

## What You Should See

As this conversation progresses, the percentage **should** increase. Try:
```bash
# Check actual context usage
/context
```

The status line will show context usage once there's meaningful conversation history. Right now at session start, 0% is technically correct (no conversation tokens used yet), though system overhead isn't counted.

## Sources

- [Claude Code Status Line Docs](https://code.claude.com/docs/en/statusline)
- [Issue #17959: used_percentage doesn't match internal calculation](https://github.com/anthropics/claude-code/issues/17959)
- [Issue #516: Always show available context percentage](https://github.com/anthropics/claude-code/issues/516)

━━━ 📚  L E A R N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 7/7

📋 SUMMARY: Context counter shows 0% at session start (expected) and has a known bug that excludes system overhead.
📁 CAPTURE: `used_percentage` excludes ~38k tokens of system overhead; use `/context` for accurate readings
➡️ NEXT: Continue conversation and check if percentage increases, or run `/context` for accurate reading

⭐ RATE (1-10):

🗣️ NeonBrain: Zero percent is expected at session start, Dougtastic. Known bug also undercounts overhead. Use /context for accuracy.

</details>
