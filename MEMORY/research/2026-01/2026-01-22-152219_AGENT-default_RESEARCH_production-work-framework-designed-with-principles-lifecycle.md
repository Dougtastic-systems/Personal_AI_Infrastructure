---
capture_type: RESEARCH
timestamp: 2026-01-22 15:22:19 PST
executor: default
agent_completion: Production work framework designed with principles, lifecycle, features, and roadmap.
---

# RESEARCH: Production work framework designed with principles, lifecycle, features, and roadmap.

**Agent:** default
**Completed:** 2026:01:22:152219

---

## Agent Output

Now I have comprehensive context about:
1. xConnect IDE - current state through Sprint 6
2. The domain (Cydcor OVRD compensation system)
3. PAI's architectural principles and THE ALGORITHM
4. The existing system patterns

Let me create the Production Work Process Framework.

---

# xConnect IDE Production Work Process Framework

## 1. PRODUCTION WORK DEFINITION

### What is "Production Work" in xConnect IDE?

Production work in xConnect IDE is **structured investigation and validation of the Cydcor compensation data pipeline**. Unlike casual querying, production work follows a disciplined process with explicit hypotheses, baselines, verification, and documented outcomes.

**The Fundamental Constraint:** Data investigations happen against a live, constantly-changing compensation system. Every query result is potentially different from the last run. Without structure, investigations become noise.

**Core Production Work Types:**

| Work Type | Definition | Success Criteria |
|-----------|------------|------------------|
| **Query Development** | Creating, refining, and validating SQL queries for repeatable use | Query produces correct results, is parameterized, has baseline, passes assertions |
| **Data Investigation** | Root cause analysis of data anomalies or unexpected values | Cause identified, documented, resolution path known |
| **Pipeline Troubleshooting** | Debugging data flow through xConnect steps and pipelines | Failing step identified, fix applied or escalated with evidence |
| **QA Validation** | Comparing current state to expected baselines, detecting regressions | Differences categorized as expected/unexpected, baselines updated appropriately |
| **Reporting & Insights** | Extracting business intelligence for stakeholders | Clear findings, reproducible queries, exportable results |
| **Schema Change Impact** | Analyzing how schema changes affect existing queries and pipelines | Affected queries identified, migration path documented |

---

## 2. FOUNDING PRINCIPLES

Seven immutable principles govern all work in xConnect IDE. These are verifiable, actionable, and support iterative refinement.

### Principle 1: BASELINE BEFORE INVESTIGATE

**Statement:** Never investigate a data issue without first establishing what "correct" looks like.

**Verification:** Every investigation session must reference a baseline ID or explicitly document why no baseline exists.

**Implementation:**
- QA Comparison mode is the default for data investigations
- New queries prompt for baseline creation on first successful run
- Baselines are versioned with timestamps and metadata

**Rationale:** Without a baseline, you cannot know if a value is wrong--you can only know it is different. Different is not the same as wrong.

### Principle 2: HYPOTHESIS-DRIVEN EXPLORATION

**Statement:** Every data question must be framed as a testable hypothesis before querying.

**Verification:** Investigation journal entries must contain HYPOTHESIS and RESULT pairs.

**Implementation:**
- Investigation Journal component captures hypothesis before query
- Results automatically linked to the hypothesis that spawned them
- Failed hypotheses are as valuable as confirmed ones

**Rationale:** Random querying produces noise. Hypothesis-driven work produces signal and learnable patterns.

### Principle 3: DOCUMENT SURPRISING FINDINGS IMMEDIATELY

**Statement:** When data behaves unexpectedly, capture the finding before moving on.

**Verification:** Surprise flag in UI triggers immediate capture workflow.

**Implementation:**
- One-click "This is surprising" button on results
- Automatically captures query, result snapshot, and prompts for brief note
- Surprises feed into learning system for pattern detection

**Rationale:** Surprising findings are the raw material of insight. Uncaptured surprises are lost intelligence.

### Principle 4: TRACK QUERY LINEAGE

**Statement:** Every query result should trace back to its originating context.

**Verification:** Query history includes session context, preceding queries, and purpose.

**Implementation:**
- Session-based history grouping (not just chronological list)
- "Why did I run this?" annotation field
- Query chains show parent-child relationships

**Rationale:** Reproducibility requires context. A query without context is trivia.

### Principle 5: VALIDATE BEFORE TRUSTING

**Statement:** No data insight is valid until verified independently.

**Verification:** Investigation conclusions require at least one corroborating query.

**Implementation:**
- Conclusion checklist includes "corroborating evidence" field
- Cross-table validation suggestions based on domain knowledge
- Warning when conclusions based on single-source data

**Rationale:** Data lies. Or more precisely, partial data tells partial truths. Verification catches partial truths.

### Principle 6: ITERATE WITH VISIBILITY

**Statement:** All refinement cycles must be visible and recoverable.

**Verification:** Query history shows iteration lineage (v1 -> v2 -> v3).

**Implementation:**
- Query versioning with diff view between versions
- Rollback to any previous iteration
- Iteration notes explaining why each change was made

**Rationale:** Iteration is how we converge on truth. Invisible iteration produces confusion about which version is correct.

### Principle 7: LEARN AND PERSIST

**Statement:** Insights from investigations must feed back into system intelligence.

**Verification:** Session end workflow prompts for learning capture.

**Implementation:**
- Auto-suggested patterns based on session activity
- Integration with PAI memory system
- Playbook suggestions when encountering similar future scenarios

**Rationale:** Intelligence compounds. Without learning capture, every session starts from zero.

---

## 3. WORK LIFECYCLE

Production work flows through five phases, each with explicit entry and exit criteria.

### Phase 1: INTAKE

**Purpose:** Transform a vague question into a structured work session.

| Entry Criteria | Exit Criteria |
|----------------|---------------|
| User has a question or task | Session has clear objective |
| | Relevant baselines identified or flagged as missing |
| | Initial hypotheses documented |

**Activities:**
1. **Session Initialization**
   - Name the session (auto-suggested from first query or manual)
   - Categorize work type (Investigation, QA, Reporting, etc.)
   - Link to related past sessions if applicable

2. **Baseline Assessment**
   - Check if relevant baselines exist
   - If missing, decide: create baseline first, or proceed without?
   - Document baseline decision

3. **Hypothesis Formation**
   - State initial hypothesis in Investigation Journal
   - Identify what tables/columns are relevant
   - Note expected vs. unexpected outcomes

**Tools Required:**
- Session initialization dialog
- Baseline search/browse
- Investigation Journal (first entry)

### Phase 2: INVESTIGATION

**Purpose:** Explore data systematically to test hypotheses.

| Entry Criteria | Exit Criteria |
|----------------|---------------|
| Session initialized | All hypotheses tested |
| Initial hypotheses documented | Findings documented with evidence |
| | Surprising results captured |

**Activities:**
1. **Hypothesis Testing**
   - Write queries to test each hypothesis
   - Execute and capture results
   - Mark hypothesis as CONFIRMED, REFUTED, or INCONCLUSIVE

2. **Iterative Refinement**
   - Refine queries based on results
   - Document why each refinement was made
   - Track query versions

3. **Surprise Capture**
   - Flag unexpected findings immediately
   - Capture context (what was expected, what was found)
   - Note potential causes for later investigation

4. **Branching**
   - When findings reveal new questions, create linked hypotheses
   - Maintain hypothesis tree (parent-child relationships)
   - Decide: pursue branch now or queue for later?

**Tools Required:**
- Query Editor with hypothesis binding
- Iteration tracking with diff view
- Surprise capture button
- Hypothesis branching interface

### Phase 3: VALIDATION

**Purpose:** Verify findings through independent means.

| Entry Criteria | Exit Criteria |
|----------------|---------------|
| Findings documented | All key findings have corroborating evidence |
| Evidence queries captured | Cross-validation complete |
| | Confidence level assigned to conclusions |

**Activities:**
1. **Cross-Validation**
   - For each key finding, identify an independent data source
   - Write corroborating query
   - Document whether corroboration succeeds or fails

2. **Baseline Comparison**
   - Compare current state to relevant baselines
   - Categorize differences: expected (explainable) vs. unexpected (anomaly)
   - Update baselines if changes are expected

3. **Assertion Checking**
   - Run relevant assertions (row count, null checks, range checks)
   - Document assertion results
   - Flag any assertion failures for investigation

4. **Confidence Assignment**
   - Rate confidence in each conclusion (HIGH, MEDIUM, LOW)
   - Document what would increase confidence
   - Flag low-confidence conclusions for additional work

**Tools Required:**
- Cross-validation suggestion engine
- Baseline comparison (QA Mode)
- Assertion runner
- Confidence rating interface

### Phase 4: CONCLUSION

**Purpose:** Synthesize findings into actionable insights.

| Entry Criteria | Exit Criteria |
|----------------|---------------|
| Validation complete | Conclusions documented |
| Confidence levels assigned | Recommended actions stated |
| | Artifacts organized (queries, baselines, exports) |

**Activities:**
1. **Conclusion Synthesis**
   - Summarize what was learned
   - State conclusions clearly (not findings--conclusions)
   - Link conclusions to supporting evidence

2. **Action Recommendations**
   - What should happen next?
   - Who needs to know?
   - What decisions are enabled by this work?

3. **Artifact Organization**
   - Save reusable queries with proper names
   - Update or create baselines
   - Export results for stakeholders if needed

4. **Handoff Preparation**
   - If work continues, what context is needed?
   - If work is complete, what is the "done" artifact?

**Tools Required:**
- Conclusion editor
- Action recommendation template
- Artifact save/organize workflow
- Handoff document generator

### Phase 5: LEARNING

**Purpose:** Extract and persist intelligence for future use.

| Entry Criteria | Exit Criteria |
|----------------|---------------|
| Conclusions documented | Patterns captured in learning system |
| Session artifacts organized | Playbook updated if applicable |
| | Session archived with metadata |

**Activities:**
1. **Pattern Extraction**
   - What patterns emerged from this investigation?
   - Are these patterns reusable?
   - Do they apply to specific tables, pipelines, or work types?

2. **Playbook Update**
   - If this is a recurring investigation type, update the playbook
   - Document the successful approach
   - Note pitfalls encountered

3. **Memory Integration**
   - Capture key learnings in PAI memory
   - Tag with relevant labels
   - Link to session artifacts

4. **Session Archive**
   - Archive complete session with searchable metadata
   - Enable future recall via natural language

**Tools Required:**
- Pattern extraction prompts
- Playbook editor
- PAI memory integration
- Session archive with search

---

## 4. PROCESS MAP

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PRODUCTION WORK FLOW                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   USER HAS QUESTION                                                          │
│          │                                                                   │
│          ▼                                                                   │
│   ┌──────────────┐    No baselines?    ┌──────────────────────┐             │
│   │   INTAKE     │ ───────────────────→│ Create baseline first │             │
│   │              │                      └──────────────────────┘             │
│   │ • Session ID │ ←────────────────────────────┘                            │
│   │ • Work Type  │                                                           │
│   │ • Hypotheses │                                                           │
│   └──────────────┘                                                           │
│          │                                                                   │
│          ▼                                                                   │
│   ┌──────────────┐    Need more data?   ┌─────────────────────┐             │
│   │INVESTIGATION │ ←───────────────────→│ Branch to new hypo  │             │
│   │              │                       └─────────────────────┘             │
│   │ • Hypotheses │                                                           │
│   │ • Queries    │    Surprising?        ┌─────────────────────┐             │
│   │ • Iterations │ ─────────────────────→│ Capture immediately │             │
│   └──────────────┘                       └─────────────────────┘             │
│          │                                                                   │
│          ▼                                                                   │
│   ┌──────────────┐    Low confidence?   ┌─────────────────────┐             │
│   │  VALIDATION  │ ←───────────────────→│ Add corroboration   │             │
│   │              │                       └─────────────────────┘             │
│   │ • Cross-val  │                                                           │
│   │ • Baselines  │    Assertions fail?   ┌─────────────────────┐             │
│   │ • Assertions │ ─────────────────────→│ Investigate failure │             │
│   └──────────────┘                       └─────────────────────┘             │
│          │                                                                   │
│          ▼                                                                   │
│   ┌──────────────┐                                                           │
│   │  CONCLUSION  │                                                           │
│   │              │                                                           │
│   │ • Findings   │                                                           │
│   │ • Actions    │                                                           │
│   │ • Artifacts  │                                                           │
│   └──────────────┘                                                           │
│          │                                                                   │
│          ▼                                                                   │
│   ┌──────────────┐                                                           │
│   │   LEARNING   │ ─────────────────────→ PAI Memory System                  │
│   │              │                                                           │
│   │ • Patterns   │ ─────────────────────→ Playbooks                          │
│   │ • Playbook   │                                                           │
│   │ • Archive    │ ─────────────────────→ Session History                    │
│   └──────────────┘                                                           │
│          │                                                                   │
│          ▼                                                                   │
│      COMPLETE                                                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. FEATURE REQUIREMENTS

### 5.1 Work Session Management

**Current State:** No session concept. Queries are independent.

**Required Features:**

| Feature | Description | Priority |
|---------|-------------|----------|
| Session Start | Initialize named session with type, objective, hypotheses | P0 |
| Session Context Bar | Persistent display showing current session name and status | P0 |
| Session Pause/Resume | Save session state, resume later with full context | P1 |
| Session Archive | Archive completed sessions with searchable metadata | P1 |
| Session Templates | Pre-built session structures for common work types | P2 |

**Data Model:**
```typescript
interface WorkSession {
  id: string;
  name: string;
  type: 'Investigation' | 'QA' | 'Reporting' | 'Pipeline' | 'Adhoc';
  objective: string;
  status: 'Active' | 'Paused' | 'Complete' | 'Archived';
  createdAt: Date;
  updatedAt: Date;
  hypotheses: Hypothesis[];
  queries: QueryRecord[];
  findings: Finding[];
  conclusions: Conclusion[];
  relatedSessions: string[]; // IDs
}
```

### 5.2 Investigation Journal

**Current State:** No hypothesis tracking. Queries run without stated purpose.

**Required Features:**

| Feature | Description | Priority |
|---------|-------------|----------|
| Hypothesis Entry | Capture hypothesis before running query | P0 |
| Result Binding | Automatically link query results to hypothesis | P0 |
| Hypothesis Status | Mark as CONFIRMED, REFUTED, INCONCLUSIVE, PENDING | P0 |
| Hypothesis Branching | Create child hypotheses from findings | P1 |
| Hypothesis Tree View | Visualize hypothesis evolution | P2 |

**Data Model:**
```typescript
interface Hypothesis {
  id: string;
  sessionId: string;
  statement: string;
  status: 'PENDING' | 'CONFIRMED' | 'REFUTED' | 'INCONCLUSIVE';
  parentId?: string; // For branching
  evidence: {
    queryId: string;
    resultSnapshot: string; // JSON
    interpretation: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
```

### 5.3 Surprise Capture

**Current State:** No mechanism to flag unexpected results.

**Required Features:**

| Feature | Description | Priority |
|---------|-------------|----------|
| Surprise Button | One-click "This is surprising" on results | P0 |
| Quick Note | Prompt for brief explanation of why surprising | P0 |
| Expectation Capture | What was expected vs. what was found | P1 |
| Surprise Log | Browsable list of all captured surprises | P1 |
| Pattern Detection | AI-assisted detection of surprise patterns | P3 |

**Data Model:**
```typescript
interface Surprise {
  id: string;
  sessionId: string;
  queryId: string;
  resultSnapshot: string;
  expectedBehavior: string;
  actualBehavior: string;
  note: string;
  resolution?: string;
  createdAt: Date;
}
```

### 5.4 Enhanced Baseline Management

**Current State:** Basic baseline save/compare exists in QA Mode.

**Required Features:**

| Feature | Description | Priority |
|---------|-------------|----------|
| Baseline Versioning | Multiple versions of same baseline over time | P0 |
| Baseline Browser | Search and browse all baselines | P0 |
| Baseline Metadata | Tags, descriptions, creation context | P1 |
| Baseline Dependencies | Show which queries/sessions reference a baseline | P1 |
| Baseline Alerts | Notify when baseline is stale or unused | P2 |

**Data Model Enhancement:**
```typescript
interface Baseline {
  id: string;
  name: string;
  description: string;
  tags: string[];
  queryHash: string;
  queryText: string;
  versions: {
    version: number;
    createdAt: Date;
    createdBy: string; // Session ID
    rowCount: number;
    checksum: string;
    data: string; // Path to JSON
  }[];
  assertions: Assertion[];
  lastUsed: Date;
  usageCount: number;
}
```

### 5.5 Playbook Library

**Current State:** No reusable investigation procedures.

**Required Features:**

| Feature | Description | Priority |
|---------|-------------|----------|
| Playbook Browser | Browse available playbooks by category | P1 |
| Playbook Execution | Step through playbook with query templates | P1 |
| Playbook Creation | Save investigation pattern as new playbook | P1 |
| Playbook Variables | Parameterize playbooks (e.g., period, ICL) | P2 |
| Playbook Suggestions | AI suggests relevant playbook based on context | P3 |

**Data Model:**
```typescript
interface Playbook {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: PlaybookStep[];
  variables: {
    name: string;
    description: string;
    type: 'string' | 'number' | 'date' | 'select';
    options?: string[];
    default?: string;
  }[];
  createdFrom?: string; // Session ID
  useCount: number;
  successRate: number;
}

interface PlaybookStep {
  order: number;
  title: string;
  instruction: string;
  queryTemplate?: string;
  expectedResult?: string;
  onSuccess: 'next' | 'branch' | 'complete';
  onFailure: 'investigate' | 'skip' | 'abort';
}
```

### 5.6 Query Lineage & Context

**Current State:** Query history is chronological list without context.

**Required Features:**

| Feature | Description | Priority |
|---------|-------------|----------|
| Session Grouping | Group history by session | P0 |
| Query Purpose | "Why did I run this?" annotation | P0 |
| Query Chains | Parent-child relationships between queries | P1 |
| Iteration Tracking | Version history with diffs | P1 |
| Lineage Visualization | Graph view of query evolution | P3 |

### 5.7 Conclusion Capture

**Current State:** No structured way to document conclusions.

**Required Features:**

| Feature | Description | Priority |
|---------|-------------|----------|
| Conclusion Editor | Structured form for conclusions | P1 |
| Evidence Links | Link conclusions to supporting queries/results | P1 |
| Action Items | Capture recommended next steps | P1 |
| Confidence Rating | Rate confidence in conclusions | P1 |
| Conclusion Export | Export conclusions for stakeholders | P2 |

### 5.8 PAI Integration

**Current State:** No integration with PAI memory system.

**Required Features:**

| Feature | Description | Priority |
|---------|-------------|----------|
| Session Capture | Auto-capture session summary to PAI memory | P1 |
| Learning Ingest | Send patterns/insights to memory_ingest | P1 |
| Context Recall | Query PAI memory for related past work | P2 |
| Label Sync | Use PAI labels for session categorization | P2 |

---

## 6. INTEGRATION POINTS

### 6.1 PAI Memory System Integration

```
xConnect IDE ────────────────────────────────────────────────────────────────→
     │                                                                        │
     │  Session Capture (at session end)                                      │
     │  • Session summary, conclusions, key findings                          │
     │  • Via memory_ingest with sessionId                                    │
     │                                                                        │
     │  Learning Capture (on pattern detection)                               │
     │  • Discovered patterns, playbook updates                               │
     │  • Tagged with session context                                         │
     │                                                                        │
     │  Context Recall (at session start)                                     │
     │  • Query memory_search for related past sessions                       │
     │  • Surface relevant playbooks and baselines                            │
     │                                                                        │
└───────────────────────────────────────────────────────────── PAI Memory ←──┘
```

**API Integration:**
```typescript
// At session end
await memoryIngest({
  sessionId: workSession.id,
  message: generateSessionSummary(workSession),
  labelIds: workSession.tags.map(t => labelIdMap[t])
});

// At session start
const relatedContext = await memorySearch({
  query: `${workSession.objective} ${workSession.type}`,
  labelIds: ['xconnect', 'investigation']
});
```

### 6.2 THE ALGORITHM Integration

xConnect production work maps naturally to THE ALGORITHM phases:

| THE ALGORITHM | xConnect Work Lifecycle | Mapping |
|---------------|------------------------|---------|
| OBSERVE | INTAKE | Understand the question, gather context |
| THINK | INTAKE (hypothesis) | Formulate testable hypotheses |
| PLAN | INTAKE (session setup) | Structure the investigation |
| EXECUTE | INVESTIGATION | Run queries, test hypotheses |
| VERIFY | VALIDATION | Cross-validate, check assertions |
| LEARN | LEARNING | Capture patterns, update playbooks |

**Integration Point:** For complex investigations (THOROUGH+ effort), spawn THE ALGORITHM with xConnect session as context:

```bash
bun run ~/.claude/skills/THEALGORITHM/Tools/AlgorithmDisplay.ts start THOROUGH \
  -r "Investigate level calculation anomaly for ICL ${iclCode}"
```

### 6.3 Browser Skill Integration

For visual validation of xConnect IDE UI:

| Scenario | Browser Skill Usage |
|----------|---------------------|
| Verify results display correctly | Screenshot comparison |
| Test QA Mode diff highlighting | Visual regression |
| Validate pipeline visualization | Component screenshot |

### 6.4 Notification System Integration

| Event | Notification Type |
|-------|-------------------|
| Session complete | Voice summary |
| Assertion failure | Desktop alert |
| Baseline drift detected | Push notification |
| Long-running query complete | Voice notification |

---

## 7. VERIFICATION CRITERIA

How do we know the framework is working?

### 7.1 Process Compliance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Sessions with objectives | 100% | Count sessions with non-empty objective |
| Queries with hypotheses | >80% | Queries linked to hypothesis / Total queries |
| Surprises captured | >90% | Flagged surprises / Manual notes about unexpected results |
| Conclusions documented | 100% | Completed sessions with conclusions |
| Learnings captured | >70% | Sessions with at least one pattern captured |

### 7.2 Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Hypothesis confirmation rate | Track trend | Confirmed / (Confirmed + Refuted) |
| Playbook success rate | >80% | Successful playbook runs / Total runs |
| Baseline stability | Track trend | Unchanged comparisons / Total comparisons |
| Time to resolution | Decrease | Session duration for similar investigations |

### 7.3 Integrity Checks

| Check | Frequency | Action on Failure |
|-------|-----------|-------------------|
| Orphaned queries (no session) | Daily | Auto-archive or prompt for session |
| Unused baselines (>30 days) | Weekly | Flag for review |
| Incomplete sessions (>7 days) | Weekly | Prompt to complete or archive |
| Unresolved surprises | Weekly | Generate investigation tasks |

### 7.4 User Experience Indicators

| Indicator | Positive Signal | Negative Signal |
|-----------|-----------------|-----------------|
| Session adoption | Sessions created naturally | Queries run outside sessions |
| Hypothesis usage | Hypotheses entered before queries | Hypotheses entered retroactively |
| Playbook usage | Playbooks referenced in new sessions | Same investigations repeated without playbook |
| Learning capture | Insights flowing to PAI memory | Empty learning captures |

---

## 8. IMPLEMENTATION ROADMAP

### Sprint 7: Session Foundation

**Goal:** Establish session infrastructure

- [ ] Session data model and persistence
- [ ] Session start dialog (name, type, objective)
- [ ] Session context bar in UI
- [ ] Session history sidebar tab (rename from "History")
- [ ] Basic session archive

**Exit Criteria:** Users can create, use, and archive sessions.

### Sprint 8: Investigation Journal

**Goal:** Hypothesis-driven workflow

- [ ] Hypothesis entry component
- [ ] Hypothesis binding to queries
- [ ] Hypothesis status tracking
- [ ] Investigation Journal view
- [ ] Surprise capture button

**Exit Criteria:** Every query can be linked to a hypothesis.

### Sprint 9: Enhanced Baselines

**Goal:** Robust baseline management

- [ ] Baseline versioning
- [ ] Baseline browser with search
- [ ] Baseline metadata (tags, descriptions)
- [ ] Baseline dependency tracking
- [ ] Stale baseline alerts

**Exit Criteria:** Baselines are versioned, searchable, and tracked.

### Sprint 10: Conclusions & Learning

**Goal:** Close the loop

- [ ] Conclusion editor
- [ ] Evidence linking
- [ ] PAI memory integration
- [ ] Pattern extraction prompts
- [ ] Session summary generation

**Exit Criteria:** Sessions flow through to learning capture.

### Sprint 11: Playbooks

**Goal:** Reusable investigation patterns

- [ ] Playbook data model
- [ ] Playbook browser
- [ ] Playbook execution (step-through)
- [ ] Playbook creation from session
- [ ] Playbook variables

**Exit Criteria:** Common investigations are codified as playbooks.

### Sprint 12: Polish & Optimization

**Goal:** Production-ready refinement

- [ ] Verification metrics dashboard
- [ ] Integrity checks automation
- [ ] Performance optimization
- [ ] User experience refinement
- [ ] Documentation completion

**Exit Criteria:** Framework is fully operational and measurable.

---

## 9. APPENDIX: EXAMPLE WORKFLOWS

### Example 1: Level Calculation Anomaly Investigation

**Intake:**
```
Session: "OHR6 Level Discrepancy Investigation"
Type: Investigation
Objective: "Determine why OHR6 shows Level 3 in P12 when expected Level 2"
Initial Hypothesis: "First-gen count changed mid-period, triggering threshold"
```

**Investigation:**
```
H1: First-gen count changed
  Query: SELECT first_gen_count, period_year, period_num, pay_week 
         FROM ovrd.auto_levels_computed WHERE c_icl_code = 'OHR6'
  Result: first_gen increased from 5 to 8 in pay_week 3
  Status: CONFIRMED

H2: 8 first-gens meets L3 threshold
  Query: SELECT * FROM ovrd.level_qual_rqmts WHERE level = 3
  Result: L3 requires >= 7 first-gens
  Status: CONFIRMED
```

**Validation:**
- Cross-validated first-gen count with statements_modeling_dataset
- Baseline comparison shows only OHR6 changed (expected)
- Confidence: HIGH

**Conclusion:**
OHR6 level change is correct. First-gen count increased from 5 to 8 mid-period, 
crossing L3 threshold of 7. Update baseline to reflect expected L3.

**Learning:**
Pattern: Mid-period level changes correlate with first-gen count changes
Playbook update: Add "check first-gen counts" as Step 1 for level investigations

---

This framework provides the architectural foundation for disciplined, learnable data work in xConnect IDE. The principles ensure rigor, the lifecycle ensures completeness, and the feature requirements ensure tooling support.

---

📋 **SUMMARY:** Designed comprehensive production work framework for xConnect IDE with 7 principles, 5-phase lifecycle, and 12-sprint roadmap.

🔍 **ANALYSIS:**
- Current xConnect IDE through Sprint 6 provides query execution and visualization
- Missing: Session management, hypothesis tracking, structured learning capture
- Domain context: Cydcor compensation data with pipelines, levels, BPL
- Integration opportunity with PAI memory and THE ALGORITHM

⚡ **ACTIONS:**
- Read xConnect IDE specifications and sprint history
- Analyzed domain tables and data flow
- Studied PAI patterns (CORE, THE ALGORITHM, Memory)
- Designed principle-based framework with concrete features

✅ **RESULTS:**
- 7 founding principles governing production work
- 5-phase work lifecycle (Intake, Investigation, Validation, Conclusion, Learning)
- 8 feature requirements with data models
- 4 integration points with PAI ecosystem
- 12-sprint implementation roadmap

📊 **STATUS:** Architecture document complete. Ready for review and sprint planning.

📁 **CAPTURE:** 
- xConnect IDE at Sprint 6 with React/Vite/Hono stack
- Domain: Cydcor OVRD compensation (levels, pipelines, BPL)
- Key principle: "Baseline before investigate"
- Integration: PAI Memory, THE ALGORITHM, Browser, Notifications

➡️ **NEXT:**
1. Review framework with principal for refinement
2. Prioritize features based on immediate needs
3. Begin Sprint 7: Session Foundation
4. Create CONTINUATION-S7.md with session implementation details

📖 **STORY EXPLANATION:**
1. Production work in xConnect means structured investigation against live compensation data
2. Seven founding principles ensure rigor: baseline first, hypothesis-driven, document surprises
3. Five-phase lifecycle: Intake, Investigation, Validation, Conclusion, Learning
4. Eight feature categories required: sessions, journals, baselines, playbooks, conclusions
5. Integration with PAI memory enables intelligence compounding across sessions
6. THE ALGORITHM phases map naturally to xConnect work lifecycle
7. Twelve sprints transform current tool into disciplined production environment
8. Verification criteria measure process compliance, quality, and user adoption

🎯 COMPLETED: Production work framework designed with principles, lifecycle, features, and roadmap.
agentId: ab5ce6f (for resuming to continue this agent's work if needed)

---

## Metadata

**Transcript:** `/Users/DSnyder/.claude/projects/-Users-DSnyder--claude-worktrees-Personal-AI-Infrastructure-affectionate-davinci/6a7f3302-bb7c-40d5-a29c-f836a7d2cfea.jsonl`
**Captured:** 2026-01-22 15:22:19 PST

---

*This output was automatically captured by UOCS SubagentStop hook.*
