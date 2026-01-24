# BUILD: Production Work Framework — Phase 3: Context Save/Restore

## Context
- Spec: `~/.claude/WORK/PRODUCTION-WORK-FRAMEWORK.md` (Part 4: Nested Context Model)
- Phase 1: Data structure complete (`MEMORY/temporal/`)
- Phase 2: NOW CLI complete (`tools/Now.ts`)

## Goal
Automatic context save on transitions and full state restoration on continue.

## Tasks

### 1. Enhance Context Snapshots
File: `~/.claude/tools/Now.ts`

Current break saves minimal context. Enhance to capture:
```yaml
context_snapshot:
  work_item_id: task-001
  timestamp: 2026-01-22T14:30:00Z
  state:
    what_doing: "Checking first-gen counts for H2"
    next_step: "Run validation query on line 45"
    hypothesis: "First-gen count should be 142"
  environment:
    cursor_position: "validation.sql:45"
    open_files: ["validation.sql", "baseline.json"]
  scratch:
    notes: "Possible issue with period boundary..."
```

### 2. Add `pai now restore` Command
- Read latest context snapshot for work item
- Display full saved state
- Optionally restore environment (open files, position)

### 3. Enhance `continue` to Auto-Restore
When continuing an item that has a saved context:
1. Load the context snapshot
2. Display "You were: {what_doing}"
3. Display "Next: {next_step}"
4. Show any scratch notes

### 4. Add Context Input on Break
When running `pai now break`:
1. Prompt for optional note (stdin or arg)
2. `pai now break "Was checking period boundaries"`
3. Save note in scratch.notes

## Data Locations
- Snapshots: `MEMORY/temporal/contexts/{timestamp}-{item-id}.yaml`
- Current state: `MEMORY/temporal/now/current.yaml`
- Work items: `MEMORY/temporal/work-items/{level}/{id}.yaml`

## Deliverables
- [ ] Enhanced context snapshot schema
- [ ] `pai now restore` command
- [ ] Auto-restore on continue
- [ ] Note capture on break

After: Report for Phase 4 (Hook Integration - SessionStart/Stop).
