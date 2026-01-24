---
capture_type: RESEARCH
timestamp: 2026-01-22 15:27:33 PST
executor: default
agent_completion: Designed six lifecycle processes with principles, workflows, tooling, and integration points for xConnect IDE
---

# RESEARCH: Designed six lifecycle processes with principles, workflows, tooling, and integration points for xConnect IDE

**Agent:** default
**Completed:** 2026:01:22:152733

---

## Agent Output

Now I have sufficient context. Let me design the comprehensive Development Lifecycle Processes for xConnect IDE.

---

## SUMMARY: Designing comprehensive development lifecycle processes for xConnect IDE covering planning, architecture, TDD, refactoring, scheduling, and prioritization

## ANALYSIS: Building on the existing investigation framework and PAI's foundational principles (Spec/Test/Evals First, CLI-First, The Algorithm), I will design six integrated process categories that complement query development workflows

## ACTIONS: Read PAI architecture docs, THE ALGORITHM skill, and CORE skill to extract design patterns for adaptation to xConnect IDE development lifecycle

## RESULTS: Complete development lifecycle framework designed below

## STATUS: Architecture design complete - ready for review and implementation planning

## CAPTURE: This design integrates THE ALGORITHM's ISC (Ideal State Criteria) pattern with traditional software development lifecycle practices, adapted for a query-centric IDE

## NEXT: Review and validate the design, then create implementation tasks for each process category

## STORY EXPLANATION:
1. xConnect IDE currently supports investigation workflows but lacks formal development lifecycle processes
2. Six process categories are needed: Planning, Architecture, TDD, Refactoring, Scheduling, Prioritization
3. Each process must integrate with THE ALGORITHM's Current State to Ideal State pattern
4. Tooling requirements are derived from each process's workflow needs
5. All processes are interconnected through a unified work item model
6. The design follows PAI's founding principles including CLI-first, spec-driven, and deterministic approaches
7. Integration points are defined to ensure processes reinforce rather than conflict with each other
8. The framework is designed to scale from simple fixes to complex multi-week initiatives

## COMPLETED: Designed six lifecycle processes with principles, workflows, tooling, and integration points for xConnect IDE

---

# xConnect IDE Development Lifecycle Processes

## Executive Summary

This architecture defines six integrated development lifecycle processes for xConnect IDE, building on the existing investigation framework. Each process is designed around the core principle of **Current State to Ideal State** transformation, with explicit verification at each stage.

---

## 1. PLANNING PROCESS

### Principles

1. **Work Items Are First-Class Citizens** - Every piece of work has explicit criteria, source, and verification method defined before execution begins
2. **Effort Levels Guide Scope** - Work is classified by effort (TRIVIAL/QUICK/STANDARD/THOROUGH/DETERMINED) which determines process rigor and available capabilities
3. **Backlog Is Living Specification** - The backlog is not a todo list; it is the evolving specification of what "ideal" looks like for the system

### Workflow

```
INTAKE → DECOMPOSITION → ESTIMATION → SCHEDULING → TRACKING

Step 1: INTAKE
├── Source: Feature request, bug report, investigation finding, tech debt discovery
├── Capture: Create work item with description, source, stakeholder
└── Gate: Does this have clear success criteria? (If not, needs refinement)

Step 2: DECOMPOSITION
├── For TRIVIAL/QUICK: Single work item, no decomposition needed
├── For STANDARD: Break into 2-5 subtasks with explicit dependencies
├── For THOROUGH+: Create ISC (Ideal State Criteria) with 20-200 rows
└── Gate: Can each item be verified independently?

Step 3: ESTIMATION (Complexity, Not Time)
├── Levels: XS (hours) / S (1-2 days) / M (3-5 days) / L (1-2 weeks) / XL (epic-level)
├── Factors: Query complexity, schema changes, integration points, risk
└── Gate: Is complexity understood well enough to estimate?

Step 4: SCHEDULING
├── Assign to sprint/iteration based on capacity and priority
├── Identify parallel vs sequential work
└── Gate: Are dependencies respected? Is capacity realistic?

Step 5: TRACKING
├── Daily: Status updates on active items
├── Sprint: Progress reviews, blockers, adjustments
└── Gate: Is the work actually moving toward ideal state?
```

### Tooling Requirements

| Feature | Description | Priority |
|---------|-------------|----------|
| **Work Item Panel** | Create/view/edit work items within IDE | P0 |
| **Backlog View** | Filterable, sortable list of pending work | P0 |
| **Sprint Board** | Kanban-style view of current sprint work | P1 |
| **Work Item Templates** | Pre-defined structures for bugs, features, investigations | P1 |
| **ISC Generator** | Generate Ideal State Criteria from work description | P2 |
| **Dependency Mapper** | Visualize work item dependencies | P2 |

### Integration

- **With THE ALGORITHM**: Work items map to ISC rows at STANDARD+ effort
- **With Investigation Framework**: Investigation findings can spawn work items directly
- **With Architecture Process**: Large work items (L/XL) require architectural review

---

## 2. ARCHITECTURE PROCESS

### Principles

1. **Design Before Build (For Significant Work)** - Work items sized L or larger require explicit design documentation before implementation
2. **Decisions Are Immutable Records** - Architecture Decision Records (ADRs) capture the context, options considered, and reasoning - never deleted, only superseded
3. **Trade-offs Are Explicit** - Every design decision has trade-offs; document what you're optimizing for AND what you're sacrificing

### Workflow

```
TRIGGER → ANALYSIS → OPTIONS → DECISION → DOCUMENTATION → REVIEW

Step 1: TRIGGER (When Design Is Required)
├── Work item sized L or XL
├── New data source integration
├── Schema changes affecting 3+ queries
├── Performance optimization initiatives
├── Security-sensitive changes
└── Gate: Does this require design? (If unsure, yes)

Step 2: ANALYSIS (THINK Phase)
├── Load context: Existing schema, affected queries, integration points
├── Apply FirstPrinciples: What assumptions are we making?
├── Research: What patterns exist for similar problems?
└── Gate: Do we understand the problem space?

Step 3: OPTIONS (Minimum 3)
├── Option A: Conservative approach (least disruption)
├── Option B: Optimal approach (best long-term)
├── Option C: Alternative approach (different trade-offs)
├── For each: Pros, cons, effort estimate, risk assessment
└── Gate: Are options genuinely different? Not variations of same idea?

Step 4: DECISION
├── Score options against criteria (weighted matrix)
├── Document which option and WHY
├── Identify what we're explicitly sacrificing
└── Gate: Is the reasoning clear enough that a stranger could understand?

Step 5: DOCUMENTATION (ADR)
├── Create ADR with standard format (below)
├── Link to work item(s) that triggered it
├── Status: PROPOSED → ACCEPTED/REJECTED/SUPERSEDED
└── Gate: Would this make sense in 6 months?

Step 6: REVIEW
├── For THOROUGH: Council review (multi-perspective analysis)
├── For DETERMINED: Council + RedTeam (adversarial analysis)
└── Gate: Have critical perspectives been heard?
```

### ADR Format

```markdown
# ADR-XXXX: [Title]

**Status:** PROPOSED | ACCEPTED | REJECTED | SUPERSEDED by ADR-YYYY
**Date:** YYYY-MM-DD
**Work Items:** [links]

## Context
What is the issue that we're seeing that is motivating this decision?

## Decision Drivers
- [Driver 1]
- [Driver 2]

## Considered Options
1. [Option A] - description
2. [Option B] - description
3. [Option C] - description

## Decision Outcome
Chosen option: "[Option X]" because [justification].

### Positive Consequences
- [Benefit 1]

### Negative Consequences (Trade-offs)
- [Sacrifice 1]

## Verification
How will we verify this decision was correct?
```

### Tooling Requirements

| Feature | Description | Priority |
|---------|-------------|----------|
| **ADR Manager** | Create, view, search ADRs within IDE | P0 |
| **Design Document Templates** | Structured templates for common design scenarios | P1 |
| **Trade-off Matrix** | Weighted scoring for option comparison | P1 |
| **Diagram Generator** | Mermaid/PlantUML integration for architecture diagrams | P2 |
| **Council Integration** | Invoke multi-agent debate for design reviews | P2 |

### Integration

- **With Planning**: L/XL work items trigger architecture process
- **With THE ALGORITHM**: THINK phase expanded for design
- **With Refactoring**: Major refactors require ADRs

---

## 3. TEST-DRIVEN DESIGN

### Principles

1. **Assertions Before Queries** - Define what the query SHOULD return before writing the query logic
2. **Baselines Are Contracts** - Expected output baselines are versioned contracts that must be explicitly updated when intentionally changed
3. **Tests Run Continuously** - Every query change triggers relevant test execution

### Workflow

```
ASSERTION DEFINITION → BASELINE CREATION → IMPLEMENTATION → VERIFICATION → REGRESSION

Step 1: ASSERTION DEFINITION
├── For new queries: Define expected behavior in plain language
│   "Given [input data], when [query runs], then [expected output]"
├── For modifications: Define what SHOULD change and what should NOT
├── Capture: Assertions linked to work item
└── Gate: Are assertions testable? (Specific, measurable, deterministic)

Step 2: BASELINE CREATION
├── Create golden output file (expected results)
├── For new queries: Manually craft expected output OR
├── For existing queries: Snapshot current output as baseline
├── Version baselines alongside queries
└── Gate: Is the baseline deterministic? (Same input always = same output)

Step 3: IMPLEMENTATION
├── Write/modify query
├── Tests fail initially (RED phase)
├── Iterate until tests pass (GREEN phase)
└── Gate: Do all assertions pass?

Step 4: VERIFICATION
├── Automated: Run query, compare to baseline
├── Diff view: Show exactly what differs
├── For intentional changes: Review and approve new baseline
└── Gate: Is the output what we intended?

Step 5: REGRESSION
├── On every query change: Run affected tests
├── On every schema change: Run all tests for affected tables
├── Flag any unintended changes
└── Gate: Did we break anything else?
```

### Test Types

| Type | Scope | When Run | Purpose |
|------|-------|----------|---------|
| **Unit Assertions** | Single query | On query save | Verify query logic |
| **Integration Tests** | Query + dependencies | On pipeline save | Verify data flow |
| **Baseline Tests** | Output comparison | On any change | Catch unintended changes |
| **Schema Tests** | Data validation | On schema change | Verify data contracts |
| **Performance Tests** | Query timing | On demand / CI | Catch performance regressions |

### Tooling Requirements

| Feature | Description | Priority |
|---------|-------------|----------|
| **Assertion Builder** | UI for defining test assertions | P0 |
| **Baseline Manager** | Create, view, update baseline files | P0 |
| **Test Runner** | Execute tests with visual feedback | P0 |
| **Coverage View** | Which queries have tests? What's uncovered? | P1 |
| **Diff Viewer** | Side-by-side comparison of expected vs actual | P1 |
| **Test Discovery** | Find all tests, organize by type/coverage | P2 |

### Integration

- **With Planning**: Work items require test criteria before "done"
- **With THE ALGORITHM**: VERIFY phase uses test infrastructure
- **With Refactoring**: All refactors require passing tests before and after

---

## 4. REFACTORING PROCESS

### Principles

1. **Safe Before Fast** - Refactoring must preserve behavior; optimizations come after behavior is locked via tests
2. **One Change at a Time** - Each refactoring step is atomic and independently verifiable
3. **Technical Debt Is Tracked** - Debt is not hidden; it's visible, prioritized, and scheduled

### Workflow

```
TRIGGER → SAFETY NET → REFACTOR → VERIFY → DOCUMENT

Step 1: TRIGGER (When to Refactor)
├── Code smell detected (duplication, complexity, naming)
├── Performance issue identified (slow queries, N+1 patterns)
├── Schema evolution required (new columns, normalization)
├── Readability concern (hard to understand query)
├── Tech debt threshold reached
└── Gate: Is refactoring justified? (Benefit > Risk)

Step 2: SAFETY NET
├── Ensure tests exist for affected queries
├── If no tests: Create baseline tests FIRST
├── Capture current behavior as contract
└── Gate: Are all affected queries tested?

Step 3: REFACTOR (One Step at a Time)
├── Make ONE atomic change
├── Common refactors:
│   ├── Extract: Pull common logic into reusable query/CTE
│   ├── Rename: Improve naming for clarity
│   ├── Inline: Remove unnecessary abstraction
│   ├── Optimize: Improve performance (after behavior locked)
│   └── Restructure: Reorganize for readability
└── Gate: Is this change atomic and reversible?

Step 4: VERIFY
├── Run all affected tests
├── Compare output to baseline
├── Performance: Compare timing (for optimization refactors)
└── Gate: Behavior preserved? Performance not degraded?

Step 5: DOCUMENT
├── For significant refactors: Update ADR or create new one
├── For schema changes: Update schema documentation
├── For optimization: Document before/after metrics
└── Gate: Would future developer understand what changed and why?
```

### Refactoring Playbooks

| Playbook | When to Use | Steps |
|----------|-------------|-------|
| **Extract CTE** | Repeated subquery logic | Identify duplication → Extract to CTE → Update references → Test |
| **Rename Column** | Misleading/unclear names | Add alias → Update references → Remove original (migration) |
| **Optimize Join** | Performance issue in join | Add baseline test → Analyze plan → Apply optimization → Compare |
| **Normalize Schema** | Data duplication | Create new table → Migrate data → Update queries → Remove old |

### Tooling Requirements

| Feature | Description | Priority |
|---------|-------------|----------|
| **Refactoring Commands** | IDE commands for common refactors | P1 |
| **Performance Profiler** | Query timing and execution plan analysis | P1 |
| **Debt Backlog** | Track technical debt items | P1 |
| **Schema Diff** | Compare schema versions | P2 |
| **Playbook Runner** | Guided refactoring workflows | P2 |

### Integration

- **With TDD**: Tests required before refactoring
- **With Architecture**: Major refactors require ADRs
- **With Planning**: Tech debt items are work items in backlog

---

## 5. SCHEDULING & SEQUENCING

### Principles

1. **Dependencies Are Explicit** - No hidden dependencies; all blocking relationships are visible and tracked
2. **Critical Path Is Visible** - The longest chain of dependent work determines the minimum timeline
3. **Parallel Work Is Identified** - Independent work should proceed in parallel to maximize throughput

### Workflow

```
DEPENDENCY MAPPING → CRITICAL PATH → PARALLEL IDENTIFICATION → RESOURCE ALLOCATION → INTERRUPT HANDLING

Step 1: DEPENDENCY MAPPING
├── For each work item: What must complete before this can start?
├── Types of dependencies:
│   ├── Data: Query B needs table from Query A
│   ├── Logic: Feature B builds on Feature A
│   ├── Knowledge: Need to understand X before designing Y
│   └── External: Waiting on API, stakeholder, or approval
└── Gate: Are all dependencies identified? Any circular dependencies?

Step 2: CRITICAL PATH ANALYSIS
├── Calculate: Longest chain of sequential work
├── Identify: Which items are on critical path (any delay = overall delay)
├── Identify: Which items have float (can slip without affecting end date)
└── Gate: Is critical path realistic given constraints?

Step 3: PARALLEL IDENTIFICATION
├── Find: Items with no dependencies on each other
├── Group: Parallel work packages that can proceed simultaneously
├── Assign: To different agents/developers if capacity allows
└── Gate: Are parallel groups truly independent?

Step 4: RESOURCE ALLOCATION
├── Match: Work to available capacity
├── Avoid: Overallocation (too much to one person/agent)
├── Consider: Skill requirements (some work needs specific expertise)
└── Gate: Is allocation realistic?

Step 5: INTERRUPT HANDLING
├── When urgent work arrives:
│   ├── Assess: True urgency vs perceived urgency
│   ├── Impact: What gets delayed if we take this?
│   ├── Decision: Accept interrupt or schedule for next sprint
└── Gate: Is the interrupt handled according to priority, not just urgency?
```

### Tooling Requirements

| Feature | Description | Priority |
|---------|-------------|----------|
| **Dependency Graph** | Visual DAG of work item dependencies | P0 |
| **Critical Path View** | Highlight critical path items | P1 |
| **Parallel Work Indicator** | Show what can proceed in parallel | P1 |
| **Capacity Tracker** | Track allocation vs available capacity | P2 |
| **Interrupt Protocol UI** | Structured handling of urgent requests | P2 |

### Integration

- **With Planning**: Dependencies captured during decomposition
- **With Prioritization**: Priority determines which critical path gets resources
- **With THE ALGORITHM**: Parallel work maps to parallel agent execution

---

## 6. PRIORITIZATION

### Principles

1. **Value Maximization** - Prioritize work that delivers the most value per unit of effort
2. **Explicit Trade-offs** - When deprioritizing, be explicit about what we're deferring and why
3. **Regular Reassessment** - Priorities change; reassess weekly, not just at sprint planning

### Workflow

```
INTAKE TRIAGE → VALUE ASSESSMENT → EFFORT ASSESSMENT → PRIORITY SCORING → QUEUE MANAGEMENT

Step 1: INTAKE TRIAGE (Eisenhower Matrix)
├── URGENT + IMPORTANT: Do immediately (interrupts current work)
├── NOT URGENT + IMPORTANT: Schedule (next sprint or roadmap)
├── URGENT + NOT IMPORTANT: Delegate or quick fix
├── NOT URGENT + NOT IMPORTANT: Backlog or decline
└── Gate: Is triage accurate? (Beware of everything being "urgent")

Step 2: VALUE ASSESSMENT
├── Business Value: Revenue impact, customer satisfaction, risk reduction
├── Technical Value: Reduces debt, improves architecture, enables future work
├── Learning Value: Teaches something valuable, reduces future unknowns
├── Stakeholder Value: Who wants this? How much do they care?
└── Gate: Is value scored consistently? (Use same scale)

Step 3: EFFORT ASSESSMENT
├── Complexity: Query complexity, schema changes, integration points
├── Risk: Likelihood of issues, blast radius if wrong
├── Dependencies: Blocked by other work? Blocks other work?
├── Unknowns: How much do we not know?
└── Gate: Is effort realistic? (Avoid optimism bias)

Step 4: PRIORITY SCORING
├── Formula: Priority = (Value Score) / (Effort Score)
├── Adjust for: Strategic alignment, dependencies, deadlines
├── Result: Stack rank of all work items
└── Gate: Does the ranking feel right? (Sanity check)

Step 5: QUEUE MANAGEMENT
├── Top of queue: Next work to pull when capacity frees
├── Weekly: Reassess top 10-20 items
├── Monthly: Reassess full backlog (prune stale items)
└── Gate: Is the queue current? (Not stale priorities)
```

### Priority Matrix

```
                    LOW EFFORT          HIGH EFFORT
                 ┌─────────────────┬─────────────────┐
   HIGH VALUE    │    QUICK WINS   │   BIG BETS      │
                 │    Do first     │   Plan carefully │
                 ├─────────────────┼─────────────────┤
   LOW VALUE     │    FILL WORK    │   AVOID         │
                 │    When idle    │   Unless forced  │
                 └─────────────────┴─────────────────┘
```

### Tooling Requirements

| Feature | Description | Priority |
|---------|-------------|----------|
| **Priority Queue View** | Stack-ranked list of work items | P0 |
| **Value/Effort Scorer** | UI for scoring dimensions | P1 |
| **Priority Matrix** | Visual quadrant view | P1 |
| **Stakeholder Input** | Capture stakeholder priority votes | P2 |
| **Priority History** | Track how priorities changed over time | P2 |

### Integration

- **With Planning**: Priority determines sprint content
- **With Scheduling**: High priority items get critical path treatment
- **With THE ALGORITHM**: Effort classification aligns with priority effort assessment

---

## PROCESS MAP: How Everything Connects

```
                                    ┌────────────────────┐
                                    │   WORK INTAKE      │
                                    │ (Bug, Feature, Debt)│
                                    └────────┬───────────┘
                                             │
                                             ▼
                    ┌────────────────────────────────────────────────┐
                    │                  PLANNING                       │
                    │  Decompose → Estimate → Schedule → Track        │
                    └────────────────────────┬───────────────────────┘
                                             │
                         ┌───────────────────┼───────────────────┐
                         │                   │                   │
                         ▼                   ▼                   ▼
               ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
               │  PRIORITIZATION │ │  ARCHITECTURE   │ │   SCHEDULING    │
               │  Value/Effort   │ │  Design/ADRs    │ │  Dependencies   │
               │  What to do     │ │  How to do it   │ │  When to do it  │
               └────────┬────────┘ └────────┬────────┘ └────────┬────────┘
                        │                   │                   │
                        └───────────────────┼───────────────────┘
                                            │
                                            ▼
                    ┌────────────────────────────────────────────────┐
                    │              TEST-DRIVEN DESIGN                 │
                    │   Define assertions → Create baseline → Test    │
                    └────────────────────────┬───────────────────────┘
                                             │
                                             ▼
                    ┌────────────────────────────────────────────────┐
                    │               EXECUTE (THE ALGORITHM)           │
                    │   OBSERVE → THINK → PLAN → BUILD → EXECUTE      │
                    │   → VERIFY → LEARN                              │
                    └────────────────────────┬───────────────────────┘
                                             │
                        ┌────────────────────┴────────────────────┐
                        │                                         │
                        ▼                                         ▼
              ┌─────────────────┐                       ┌─────────────────┐
              │   DONE          │                       │   REFACTORING   │
              │   (Work Item    │◄──────────────────────│   (Improve      │
              │   Complete)     │                       │   Quality)      │
              └────────┬────────┘                       └─────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   LEARN         │
              │   (User Rating) │
              │   (Memory)      │
              └─────────────────┘
```

---

## FEATURE REQUIREMENTS SUMMARY

### P0 (Critical for MVP)

1. Work Item Panel - Create/view/edit work items
2. Backlog View - Filterable list of pending work
3. Assertion Builder - UI for defining test assertions
4. Baseline Manager - Create, view, update baseline files
5. Test Runner - Execute tests with visual feedback
6. ADR Manager - Create, view, search ADRs
7. Dependency Graph - Visual DAG of work item dependencies
8. Priority Queue View - Stack-ranked list of work items

### P1 (Important for Usability)

1. Sprint Board - Kanban-style current sprint view
2. Work Item Templates - Pre-defined structures
3. Coverage View - Test coverage visualization
4. Diff Viewer - Expected vs actual comparison
5. Design Document Templates - Structured design templates
6. Trade-off Matrix - Option comparison scoring
7. Critical Path View - Highlight critical path items
8. Parallel Work Indicator - Show parallel opportunities
9. Performance Profiler - Query timing analysis
10. Debt Backlog - Technical debt tracking
11. Value/Effort Scorer - Priority scoring UI
12. Priority Matrix - Visual quadrant view
13. Refactoring Commands - IDE commands for common refactors

### P2 (Nice to Have)

1. ISC Generator - Generate Ideal State Criteria from description
2. Dependency Mapper - Visualize work item dependencies
3. Test Discovery - Find and organize all tests
4. Diagram Generator - Mermaid/PlantUML integration
5. Council Integration - Multi-agent debate for reviews
6. Schema Diff - Compare schema versions
7. Playbook Runner - Guided refactoring workflows
8. Capacity Tracker - Allocation vs available capacity
9. Interrupt Protocol UI - Structured urgent request handling
10. Stakeholder Input - Capture priority votes
11. Priority History - Track priority changes over time

---

## SPRINT ADDITIONS (Roadmap Impact)

### Phase 1: Foundation (Sprint 1-2)

- Work Item Model and Panel
- Basic Test Runner
- Priority Queue View

### Phase 2: Core Workflows (Sprint 3-4)

- Backlog and Sprint Board
- Assertion Builder and Baseline Manager
- ADR Manager

### Phase 3: Advanced Features (Sprint 5-6)

- Dependency Graph and Critical Path
- Coverage View and Diff Viewer
- Performance Profiler

### Phase 4: Polish (Sprint 7-8)

- Templates (Work Item, Design Document)
- Refactoring Commands
- Council/RedTeam Integration

---

**END OF ARCHITECTURE DOCUMENT**
agentId: a19e4a4 (for resuming to continue this agent's work if needed)

---

## Metadata

**Transcript:** `/Users/DSnyder/.claude/projects/-Users-DSnyder--claude-worktrees-Personal-AI-Infrastructure-affectionate-davinci/6a7f3302-bb7c-40d5-a29c-f836a7d2cfea.jsonl`
**Captured:** 2026-01-22 15:27:33 PST

---

*This output was automatically captured by UOCS SubagentStop hook.*
