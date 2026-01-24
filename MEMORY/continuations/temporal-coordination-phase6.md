# BUILD: Production Work Framework — Phase 6: Decision Engine

## Context
- Spec: `~/.claude/WORK/PRODUCTION-WORK-FRAMEWORK.md`
- Phases 1-5 complete:
  - Phase 1: Data structure (`MEMORY/temporal/`)
  - Phase 2: NOW CLI (basic display)
  - Phase 3: Context save/restore
  - Phase 4: Hook integration (SessionStart shows NOW, Stop saves context)
  - Phase 5: xConnect IDE integration (NOW header + sidebar tab + investigation workflow)

## Goal
Implement the Decision Engine algorithm that suggests ONE work item based on priority, energy, time, and context.

## The Algorithm (from spec Part 3)
```
Selection Priority:
1. Priority (P0 > P1 > P2 > P3)
2. Energy match (current energy ≥ required energy)
3. Time fit (estimate ≤ available time)
4. Context continuity (same project preferred)
5. Urgency (due date proximity)
6. Freshness (recently touched preferred for momentum)
```

## Tasks
1. **Energy Level Input** - Add UI to set current energy (low/medium/high/peak)
2. **Time Block Setup** - Allow setting available time duration
3. **Decision Algorithm** - Implement selection logic in `server/temporal.ts`
4. **Override Capability** - Allow rejecting suggestion without guilt language

## Key Files
- `server/temporal.ts` - Add `suggestNextWork()` function
- `src/components/NowPanel.tsx` - Add energy selector, time input
- `MEMORY/temporal/now/current.yaml` - Stores energy_level
- `MEMORY/temporal/work-items/project/*.yaml` - Work items with energy_required

## Current Work Items (for testing)
- proj-xconnect-ide: P1, high energy, active
- proj-graphiti-kg: P1, high energy, ready
- proj-omni-capture: P1, medium energy, ready

## ADHD-First Design Rules
- Default suggestion if no input (works at 10% capacity)
- No multi-step ceremonies
- "Override" not "Reject" language
- Show reasoning for suggestion

## After Completion
**Phase 7: Personal Dashboard** (NOT Change Ledger)
- Universal NOW visibility for ALL work, not just xConnect
- Simple web dashboard showing: time block, current work, all projects, investigation phase
- Same temporal API, different UI surface
- xConnect IDE is one client; Personal Dashboard is the universal client

REMINDER: The temporal system is universal. xConnect is domain-specific. Personal Dashboard serves tool buildout, Graphiti, Omni Capture, blog, and everything else.
