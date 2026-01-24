# BUILD: Production Work Framework — Phase 4: Hook Integration

## Context
- Spec: `~/.claude/WORK/PRODUCTION-WORK-FRAMEWORK.md` (Part 11: Implementation Phases)
- Phase 1: Data structure complete (`MEMORY/temporal/`)
- Phase 2: NOW CLI complete (`tools/Now.ts`)
- Phase 3: Context save/restore complete (break notes, restore command, auto-restore on continue)

## Goal
Integrate temporal coordination into PAI session lifecycle via hooks.

## Tasks

### 1. SessionStart Hook Enhancement
Show NOW suggestion when session starts:
- Display current/suggested work item
- Show saved context if resuming
- One-line summary: "NOW: [title] — [next_step]"

Location: `hooks/SessionStart.ts` or create `hooks/NowSessionStart.ts`

### 2. SessionStop Hook - Auto Context Save
Save context automatically when session ends:
- Detect active work item from `MEMORY/temporal/now/current.yaml`
- Call break logic to save context snapshot
- Non-blocking, fire-and-forget

Location: Create `hooks/NowSessionStop.ts`

### 3. Ambient Time Display (Optional)
Show remaining time in session:
- Read time_block from current.yaml
- Calculate remaining based on elapsed
- Display in status line or periodic reminder

## Implementation Notes
- Hooks are TypeScript in `~/.claude/hooks/`
- Hook config in `settings.json` under `hooks`
- Use existing patterns from `hooks/SessionStart.ts`
- Import from `tools/Now.ts` or duplicate minimal logic

## Deliverables
- [ ] SessionStart shows NOW suggestion
- [ ] SessionStop auto-saves context
- [ ] Hooks registered in settings.json
- [ ] Test both hooks fire correctly

## Files to Read First
- `hooks/SessionStart.ts` - existing pattern
- `settings.json` - hook configuration
- `SYSTEM/THEHOOKSYSTEM.md` - hook documentation

After: Report for Phase 5 (xConnect Integration) or Phase 6 (Decision Engine).
