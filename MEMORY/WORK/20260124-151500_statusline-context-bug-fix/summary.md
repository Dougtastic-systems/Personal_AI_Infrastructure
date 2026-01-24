# Statusline Context Counter Bug Fix

**Date:** 2026-01-24
**Session:** Post v2.4 upgrade verification

## Problem

Context counter in terminal statusline showed 0% despite active conversation with accumulated context.

## Root Cause

**Duplicate JSON parsing in `statusline-command.sh`:**

1. Lines 64-75: First parse extracts `context_pct` from input
2. Lines 86-91: Fallback calculation for CC versions without `used_percentage` field
3. Lines 340-352: **Second parse overwrote `context_pct` back to 0**

The second parsing block at line 340 was re-extracting `context_pct` from the input JSON, which returned 0 because Claude Code v2.1.3 doesn't include the `used_percentage` field (added in v2.1.6).

## Fix Applied

Removed duplicate context-related extractions from second parsing block (lines 340-352):

**Before:**
```bash
eval "$(echo "$input" | jq -r '
  "current_dir=" + ... + "\n" +
  "context_max=" + (.context_window.context_window_size // 200000 | tostring) + "\n" +
  "context_pct=" + (.context_window.used_percentage // 0 | tostring) + "\n" +  # PROBLEM
  "context_remaining=" + ...
')"
```

**After:**
```bash
eval "$(echo "$input" | jq -r '
  "current_dir=" + ... + "\n" +
  "duration_ms=" + ...
')"
# context_pct already calculated with fallback in first parse block
```

## Verification

- Tested with captured statusline input
- Context bar now correctly shows ~57-58% based on token calculation
- Fallback formula: `(total_input_tokens + total_output_tokens) * 100 / context_window_size`

## Files Modified

- `~/.claude/statusline-command.sh` (lines 340-352)

## Related Issues

- Claude Code Issue #17959: `used_percentage` doesn't include system overhead
- CC v2.1.6+ has native `used_percentage` field; older versions need fallback
