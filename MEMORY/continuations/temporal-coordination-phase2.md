# Continuation: Production Work Framework - Phase 2 NOW CLI

**Created:** 2026-01-22
**Status:** READY TO START
**Prereq:** Phase 1 complete

---

## Quick Start

Copy this to a new terminal:

```
# BUILD: Production Work Framework — Phase 2: NOW CLI

## Context
- Spec: `~/.claude/WORK/PRODUCTION-WORK-FRAMEWORK.md` (Part 3: NOW Interface)
- Data: `~/.claude/MEMORY/temporal/` (Phase 1 complete)

## Goal
Create `pai now` CLI that reads temporal data and suggests what to work on.

## Tasks

### 1. Create NOW CLI Tool
File: `~/.claude/tools/Now.ts`

**Commands:**
- `pai now` → Show current suggestion
- `pai now continue` → Mark item as active
- `pai now switch` → Show alternatives, pick one
- `pai now break` → Save context, pause work

### 2. NOW Display Format (from spec Part 3)
```
┌─────────────────────────────────────────────┐
│ ⏰ 2:34pm                ████████░░ 86 min  │
│                                             │
│ 🎯 NOW: [suggested work item title]         │
│                                             │
│ 📍 Context:                                 │
│    Life > Project > Session > Task          │
│                                             │
│ 💭 You were:                                │
│    [context from last session]              │
│                                             │
│ ➡️ Next step:                               │
│    [next_step from work item]               │
│                                             │
│ [ Continue ]  [ Switch ]  [ Break ]         │
└─────────────────────────────────────────────┘
```

### 3. Decision Logic
1. If active work exists → Suggest CONTINUE
2. If no active → Pick by: priority > energy match > time fit > recency
3. Read from `temporal/now/current.yaml`
4. Read work items from `temporal/work-items/project/*.yaml`

### 4. Update now/current.yaml on transitions
- `continue` → Set active.work_item_id, started_at
- `switch` → Save context, change active item
- `break` → Save context, clear active

### 5. Add bin symlink
```bash
ln -sf ~/.claude/tools/Now.ts ~/.claude/bin/now
```

## Key Files
- `MEMORY/temporal/index.yaml` - Quick lookup
- `MEMORY/temporal/now/current.yaml` - Current state
- `MEMORY/temporal/work-items/project/*.yaml` - 3 seeded items

## Seeded Projects (from Phase 1)
1. **proj-xconnect-ide** - Sprint 7 stable, daily use (ACTIVE)
2. **proj-graphiti-kg** - 100% type accuracy, ready
3. **proj-omni-capture** - Phase 2A next

## Deliverables
- [ ] `~/.claude/tools/Now.ts` working
- [ ] `pai now` shows suggestion
- [ ] `pai now continue/switch/break` transitions work
- [ ] `now/current.yaml` updates on transitions

After: Report what was built for Phase 3 (Context Save/Restore).
```

---

## Session Log

| Date | Phase | Work Done |
|------|-------|-----------|
| 2026-01-22 | 1 | Core schema, directory structure, 3 seeded work items |
