# Persistent Memory for Active Projects

**Added:** 2026-01-13
**Category:** feature
**Priority:** medium
**Preconditions:** None - can implement anytime

## Context

During the Kyle Leisering override exception project, realized there's no cross-session memory for active projects. The project doc exists in `01 Notes/` but I don't automatically know about it in new sessions.

## The Idea

Two options (not mutually exclusive):

### Option 1: Global CLAUDE.md with Project Index

Create `/Users/DSnyder/CLAUDE.md` with an active projects section:

```markdown
## Active Projects

| Project | Status | Reference Doc |
|---------|--------|---------------|
| Kyle Leisering Override Exception | In Progress | `01 Notes/Ovrd_Exception_Kyle_Leisering.md` |
```

**Pros:** Simple, always visible at session start, easy to maintain
**Cons:** Manual updates required

### Option 2: Extend CORE Skill with Projects Memory

Add a `Projects.md` or `ActiveWork.md` to `.claude/skills/CORE/` that auto-loads with CORE context.

**Pros:** Integrated into PAI structure, auto-loads with session
**Cons:** More complex, may bloat CORE context

### Hybrid Approach

- CLAUDE.md for quick project index (what's active)
- Project docs in `01 Notes/` for full details (how it works)
- CORE skill references the pattern but doesn't store project data

## Expected Value

- Continuity across sessions without user having to re-explain
- Faster ramp-up when resuming work
- Audit trail of active vs completed projects over time

## When to Revisit

- When starting another multi-session project
- When CORE skill gets refactored
- When memory/context management gets enhanced in PAI
