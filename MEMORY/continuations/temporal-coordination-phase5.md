# BUILD: Production Work Framework — Phase 5: xConnect Integration

## Context
- Spec: `~/.claude/WORK/PRODUCTION-WORK-FRAMEWORK.md`
- Phases 1-4 complete:
  - Phase 1: Data structure (`MEMORY/temporal/`)
  - Phase 2: NOW CLI (basic display)
  - Phase 3: Context save/restore
  - Phase 4: Hook integration (SessionStart shows NOW, Stop saves context)

## Goal
Integrate temporal coordination into xConnect IDE for seamless work tracking during SQL investigations.

## Tasks
1. **NOW Panel in IDE** - Display same NOW suggestion in xConnect interface
2. **Investigation Workflow UI** - 5-phase lifecycle (INTAKE → INVESTIGATE → VALIDATE → CONCLUDE → LEARN)
3. **Change Ledger Integration** - Link temporal context to query changes

## xConnect Integration Points (from spec Part 5 & 7)
- Investigation workflow has 7 laws and 5 phases
- Change Ledger replaces git in prod-only environment
- Baseline-before-investigate pattern
- Hypothesis-driven exploration

## Key Files
- `MEMORY/temporal/now/current.yaml` - NOW state
- `MEMORY/temporal/contexts/` - Context snapshots
- `WORK/PRODUCTION-WORK-FRAMEWORK.md` - Full spec (Parts 5, 7)

## Deliverables
- [ ] NOW panel component for xConnect
- [ ] Investigation phase tracker
- [ ] Change ledger ↔ temporal context linking
- [ ] Context restore in IDE environment

## Questions to Resolve
- Where does xConnect IDE live? (directory/repo)
- What UI framework does it use?
- How does it currently track work sessions?

## After Completion
Report for Phase 6 (Decision Engine) - the priority/energy/time algorithm.
