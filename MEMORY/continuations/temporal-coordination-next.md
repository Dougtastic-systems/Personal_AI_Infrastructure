# Temporal Coordination — Continuation

**Created:** 2026-01-22
**Status:** Framework consolidation in progress
**Sessions:** PAI temporal design + xConnect production work framework

---

## Context

Two parallel sessions converged on the same insight: temporal coordination for knowledge work is the same problem at every scale — from life goals to SQL queries.

### Session 1 (PAI Temporal)
- Surveyed 8 existing PAI systems for task/project management
- Identified gaps: no calendar, no "Now" layer, no cross-domain visibility
- Designed ADHD-first temporal features (time blindness, transitions, decisions, shame-proof)
- Proposed `pai now` command and `MEMORY/temporal/` structure

### Session 2 (xConnect Production Work)
- Designed 5 frameworks: Investigation, Development Lifecycle, Documentation, Prod-Only, Temporal
- Identified Universal Work Item model spanning all scales
- Proposed nested context: goal → project → session → task → micro
- Same NOW interface serves both PAI and xConnect

---

## The Unified Insight

**One architecture serves ALL scales:**

```
LIFE (TELOS goals)
  └── PROJECT (continuations)
       └── SESSION (time block / investigation)
            └── TASK (specific work / hypothesis)
                 └── MICRO (current step / query)
```

**Universal Work Item schema:**

```yaml
WorkItem:
  id: string
  type: goal | project | session | task | micro
  parent: WorkItem.id | null
  state:
    status: active | paused | blocked | done
    context: string      # "You were doing..."
    next_step: string    # "Next: ..."
  time:
    started: timestamp
    budget_minutes: number
    elapsed_minutes: number
  priority: P0 | P1 | P2 | P3
  tags: string[]
```

---

## ADHD-First Design Principles

1. **Ambient time awareness** — Always visible, no checking required
2. **Scaffolded transitions** — Auto-save, countdown, entry ramps
3. **One suggestion** — Decision engine picks, you override
4. **Working memory offload** — System remembers everything
5. **Shame-proof** — Neutral language, easy restarts
6. **Low friction** — Works at 10% capacity

---

## Frameworks to Consolidate

| Framework | Source | Purpose |
|-----------|--------|---------|
| Investigation Workflow | xConnect session | 7 principles, 5-phase lifecycle |
| Development Lifecycle | xConnect session | Planning, architecture, TDD, refactoring, scheduling |
| Documentation Process | xConnect session | Reverse engineering, multi-audience |
| Prod-Only Development | xConnect session | Change ledger, safe change protocol |
| Temporal Coordination | Both sessions | NOW layer, context stack, decision engine |
| ADHD-First Features | PAI session | Time blindness, transitions, shame-proof |

---

## Build Phases

| Phase | Component | Output |
|-------|-----------|--------|
| 1 | Universal Work Item schema | `MEMORY/temporal/schema.yaml` |
| 2 | Directory structure | `MEMORY/temporal/` with templates |
| 3 | NOW CLI | `pai now` command |
| 4 | Context save/restore | Transition automation |
| 5 | Hook integration | SessionStart shows NOW |
| 6 | xConnect integration | Same interface in IDE |

---

## Start Here

**Next action:** Consolidate all frameworks into `PRODUCTION-WORK-FRAMEWORK.md`

**Requirements for consolidation:**
1. Include all 5 xConnect frameworks with full detail
2. Add ADHD-first design principles throughout
3. Define Universal Work Item schema formally
4. Specify NOW interface contract
5. Document context save/restore mechanism
6. Include data structures for `MEMORY/temporal/`

---

## Open Questions

1. Where should `PRODUCTION-WORK-FRAMEWORK.md` live? (Skill? SYSTEM doc? WORK?)
2. Should xConnect-specific content be separate or integrated?
3. How does this relate to existing THEALGORITHM skill?
