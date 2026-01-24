# Auto-Continuation Sync Before Compaction

**Date:** 2026-01-24
**Type:** Feature
**Priority:** Medium
**Status:** Proposed

## The Challenge

When Claude Code compaction triggers (~90% context), the conversation is summarized but:
1. **CONTINUATION.md files are NOT auto-updated** with current progress
2. **Todo lists are lost** unless captured in the summary
3. **Work state must be manually reconstructed** after compaction

Currently, continuation files are static snapshots written manually. There's no automatic sync between:
- Active work progress → continuation file
- Compaction event → reading continuation file on resume

## Why This Matters

During long-running tasks (like processing 117 emails in batches), compaction can happen mid-work. Without auto-sync:
- User loses context of what's completed vs remaining
- Manual recovery required (check folders, reconstruct state)
- Cognitive overhead increases

## Proposed Solution

### Pre-Compaction Hook
Add a hook that triggers before/during compaction:
```typescript
// hooks/PreCompaction.ts
- Detect active WORK/ directory
- Find CONTINUATION.md in that directory
- Update with current state:
  - Completed items (from filesystem)
  - Pending items (from todo list)
  - Key decisions made
  - Resume instructions
```

### Post-Compaction / SessionStart Enhancement
```typescript
// Enhance SessionStart hook
- Check for active WORK/ directories
- Read CONTINUATION.md if exists
- Inject context into session
```

## Implementation Notes

- Compaction detection: May need Claude Code API/event access
- Fallback: Periodic auto-save (every N messages or M minutes)
- File format: Keep CONTINUATION.md human-readable for manual recovery

## Context

Discovered during Nate email extraction pipeline work (2026-01-24). At 54% context, preparing to batch 112 remaining emails. Manual continuation file update was required to preserve state.

## Related

- SessionStart hook system
- MEMORY/continuations/ directory
- WORK/ directory conventions
