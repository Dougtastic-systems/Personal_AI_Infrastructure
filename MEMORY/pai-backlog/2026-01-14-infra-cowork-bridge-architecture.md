# CoworkBridge: PAI + Claude Cowork Integration Architecture

**Added:** 2026-01-14
**Category:** infra
**Priority:** medium
**Preconditions:** Stack rank against other backlog items; pick up when tool buildout phase begins

---

## Context

### What Is Claude Cowork?

Claude Cowork launched January 12, 2026 as Anthropic's file-system-first general agent. It's essentially Claude Code wrapped in a non-technical UI, available in the Claude Desktop app (macOS only, Max tier $100-200/mo).

**Key characteristics:**
- Built on same Claude Agent SDK as Claude Code
- Operates on folders you explicitly grant access to
- Runs in sandboxed Linux VM (Apple VZVirtualMachine)
- Task queue model: queue multiple tasks, run in parallel, add context mid-execution
- Connectors: Gmail, Google Calendar, Notion, Asana, Canva
- Produces actual artifacts: .pptx, .xlsx with formulas, formatted documents

**Sources verified:**
- [Ars Technica](https://arstechnica.com/ai/2026/01/anthropic-launches-cowork-a-claude-code-like-for-general-computing/)
- [Simon Willison's analysis](https://simonwillison.net/2026/Jan/12/claude-cowork/)

### Why This Matters for PAI

Cowork and PAI (Claude Code) serve different purposes:

| Dimension | PAI (Claude Code) | Cowork |
|-----------|-------------------|--------|
| **Interface** | Terminal/CLI | GUI with task queue |
| **Strength** | Precision, methodology, persistence | Parallel execution, artifacts, connectors |
| **Memory** | MEMORY system, cross-session | Session-only (no persistence) |
| **Best For** | Judgment-heavy work with YOUR rules | Well-defined tasks, tedious execution |

**The opportunity:** Use both systems together. PAI handles judgment-intensive work (Xactly Connect, transcript processing, framework design). Cowork handles execution-heavy work (research, meeting prep, file organization, artifact generation).

### Session Background

This brief emerged from a 2026-01-14 session exploring:
1. How PAI and Cowork could work together
2. File sharing and data flow options
3. Orchestration patterns
4. Which tasks belong where based on Doug's actual workflow (Neon Brain community, Rick meetings, Xactly Connect work)

---

## The Problem

PAI and Cowork are isolated by default. No shared context, no handoff mechanism, no way for PAI to leverage Cowork's outputs or queue work for it.

**Current state:** Manual copy-paste between systems, cognitive overhead of remembering what each system produced, no audit trail of cross-system work.

**Desired state:** Structured handoff zone where Cowork outputs flow into PAI's MEMORY system, and (optionally) PAI can queue tasks for Cowork execution.

---

## Architecture Options

### Option B: Auto-Ingest (One-Way Flow)

```
YOU ──► COWORK ──► ~/CoworkBridge/inbox/ ──► PAI Hook ──► MEMORY
                                                │
                                                ▼
                                          PAI SESSION
                                       (consumes outputs)
```

**How it works:**
1. You open Cowork and tell it what to do
2. Cowork writes outputs to `~/CoworkBridge/inbox/`
3. PAI SessionStart hook detects new files since last session
4. Hook auto-copies to `MEMORY/History/cowork/YYYY-MM-DD/`
5. Hook surfaces summary: "Cowork delivered 3 items"
6. You work in PAI with full context of what Cowork produced

**Folder structure:**
```
~/CoworkBridge/
├── inbox/              # Cowork writes here
│   ├── daily/          # Morning briefs, calendar prep
│   ├── research/       # Research outputs
│   ├── artifacts/      # PPTX, XLSX, formatted docs
│   └── meetings/       # Meeting prep materials
└── archive/            # Processed items (moved by hook)
    └── YYYY-MM-DD/     # Date-organized history
```

**Characteristics:**
| Aspect | Value |
|--------|-------|
| Complexity | Low |
| Your role | You decide what Cowork does each time |
| PAI's role | Passive consumer - ingests and archives |
| Automation | Archive only |
| Failure modes | Minimal - if hook fails, files still exist |
| Cognitive load | You remember what to ask Cowork |

**Best for:**
- Starting out / learning Cowork
- Unpredictable daily needs
- Maximum control

---

### Option D: Bidirectional Task Queue (Two-Way Flow)

```
PAI SESSION
  │
  │ "Queue research on X for Cowork"
  ▼
~/CoworkBridge/outbox/research-x.task.md
  │
  │ (next session, you open Cowork)
  ▼
YOU ──► COWORK: "Check outbox for pending tasks"
  │
  │ Cowork executes queued tasks
  ▼
~/CoworkBridge/inbox/research-x.result.md
  │
  │ PAI SessionStart hook
  ▼
MEMORY + surfaced in PAI
```

**How it works:**
1. During PAI session, you realize you need research/prep work
2. PAI writes a task file to `~/CoworkBridge/outbox/`
3. Next time you open Cowork: "Execute tasks in outbox/"
4. Cowork reads task files, executes, writes results to inbox/
5. PAI SessionStart hook detects results, archives, surfaces

**Folder structure:**
```
~/CoworkBridge/
├── inbox/              # Cowork → PAI (Cowork writes here)
│   └── [same as Option B]
├── outbox/             # PAI → Cowork (PAI writes task requests)
│   └── pending/        # Tasks waiting for execution
└── archive/            # Processed items
    └── YYYY-MM-DD/
```

**Task file format:**
```markdown
<!-- ~/CoworkBridge/outbox/research-competitor-pricing.task.md -->
---
task_id: research-competitor-pricing-20260114
created: 2026-01-14T21:30:00
priority: normal
context: Working on Neon Brain community launch pricing
---

# Task: Research Competitor Pricing

## Request
Research ADHD coaching community pricing models...

## Output Format
Save to: ~/CoworkBridge/inbox/research-competitor-pricing.result.md

## Context for Cowork
[Enough context for Cowork to execute well]
```

**Characteristics:**
| Aspect | Value |
|--------|-------|
| Complexity | Medium |
| Your role | Trigger Cowork, but PAI helps decide tasks |
| PAI's role | Active - queues work, consumes results |
| Automation | Task generation + archive |
| Failure modes | Task format mismatch, stale tasks |
| Cognitive load | Lower - PAI tracks what it needs |

**Best for:**
- Established routines
- When PAI work generates follow-on research needs
- Reducing cognitive overhead

---

## Comparison Matrix

| Dimension | Option B | Option D |
|-----------|----------|----------|
| Setup time | 30 min | 1-2 hours |
| Learning curve | Gentle | Steeper |
| Flexibility | High (ad-hoc) | Medium (structured) |
| Predictability | Lower | Higher |
| Maintenance | Minimal | Task format evolution |
| Context preservation | Manual | Automatic via task file |
| Failure recovery | Easy | Check queue state |

---

## Implementation Guidance

### Phase 1: Foundation (Both Options)

1. **Create folder structure:**
```bash
mkdir -p ~/CoworkBridge/{inbox/{daily,research,artifacts,meetings},archive}
# Add outbox/ if going with Option D:
mkdir -p ~/CoworkBridge/outbox/pending
```

2. **Grant Cowork access:**
   - Open Claude Desktop → Cowork tab
   - Click folder icon → Select `~/CoworkBridge/`

3. **Test basic flow:**
```
Cowork prompt: "Analyze my Downloads folder and save
a summary to ~/CoworkBridge/inbox/downloads-audit.md"
```

### Phase 2: PAI Hook (SessionStart Addition)

Add to existing SessionStart hook or create new hook:

**Core logic:**
```typescript
// Pseudocode - adapt to actual hook structure
const COWORK_INBOX = `${process.env.HOME}/CoworkBridge/inbox`;
const MEMORY_COWORK = `${process.env.PAI_DIR}/MEMORY/History/cowork`;

async function checkCoworkInbox(lastSessionTime: Date) {
  const newFiles = await findFilesSince(COWORK_INBOX, lastSessionTime);

  if (newFiles.length === 0) return;

  // Archive to MEMORY
  const today = new Date().toISOString().split('T')[0];
  const archiveDir = `${MEMORY_COWORK}/${today}`;
  await ensureDir(archiveDir);

  for (const file of newFiles) {
    await copy(file.path, `${archiveDir}/${file.name}`);
  }

  // Surface to user
  return {
    message: `Cowork delivered ${newFiles.length} items`,
    files: newFiles.map(f => f.name)
  };
}
```

**Hook output format:**
```
📥 Cowork delivered 3 items:
  - daily/calendar-brief.md
  - research/competitor-pricing.md
  - artifacts/pitch-deck.pptx
```

### Phase 3: Option D Extension (If Needed)

Add outbox checking to Cowork workflow:

**Standard Cowork prompt:**
```
Check ~/CoworkBridge/outbox/pending/ for any task files.
For each .task.md file:
1. Read the task request
2. Execute it
3. Save output to the location specified in the task
4. Move the task file to ~/CoworkBridge/archive/
```

**PAI task queuing pattern:**
```typescript
// When PAI needs to queue work for Cowork
async function queueForCowork(task: CoworkTask) {
  const taskFile = `${task.id}.task.md`;
  const content = formatTaskMarkdown(task);
  await write(`~/CoworkBridge/outbox/pending/${taskFile}`, content);
  return `Queued for Cowork: ${task.title}`;
}
```

---

## Use Case Mapping

Based on Doug's actual workflow patterns:

| Task | System | Rationale |
|------|--------|-----------|
| Xactly Connect xSQL | PAI | Your methodology, precision rules |
| Transcript CLEAN→MARK→VALIDATE | PAI | Your marker taxonomy encoded |
| PAI system development | PAI | Self-modifying, needs MEMORY |
| Morning calendar prep | Cowork | Well-defined, connector access |
| Research gathering | Cowork | Parallel execution, web access |
| Meeting prep packets | Cowork | Artifact generation |
| Rick follow-up emails | Cowork | Gmail connector |
| Neon Brain framework design | PAI | Judgment, methodology encoding |
| Community launch materials | Cowork | Artifacts (PPTX, templates) |

---

## Daily Rhythm (Target State)

```
MORNING (Cowork - 10 min)
├── Open Cowork tab
├── "Prep my day: calendar, urgent emails, any PAI tasks in outbox"
├── Queue runs in parallel while you shower/coffee
└── Outputs land in inbox/

MORNING REVIEW (You - 15 min)
├── Open PAI (Claude Code)
├── Hook: "Cowork delivered 4 items"
├── Review, decide what needs PAI-level attention
└── Queue additional Cowork tasks if needed

DEEP WORK (PAI - core hours)
├── Judgment-intensive work
├── Reference Cowork outputs as needed
├── PAI queues follow-on tasks to outbox/ (Option D)
└── MEMORY captures everything

END OF DAY (Quick)
├── Cowork: "Archive today's inbox/ items"
├── PAI: "Summarize open loops to outbox/" (Option D)
└── Ready for tomorrow
```

---

## Risk Considerations

### Prompt Injection
- Cowork operates on web content (via Chrome extension)
- Files from web could contain injection attacks
- **Mitigation:** Cowork uses summarization layer as defense; PAI hook only archives, doesn't execute

### File System Access
- Cowork can read/write/delete in granted folders
- Vague prompts can lead to unintended deletions
- **Mitigation:** Grant access only to CoworkBridge/, not sensitive directories

### Stale Tasks (Option D)
- Tasks in outbox/ could become irrelevant
- **Mitigation:** Include `created` timestamp, review pending tasks periodically

---

## Success Criteria

**Option B is working when:**
- [ ] Cowork outputs reliably land in inbox/
- [ ] PAI SessionStart surfaces new items
- [ ] MEMORY/History/cowork/ has organized archive
- [ ] You naturally reference Cowork outputs in PAI sessions

**Option D is working when:**
- [ ] All Option B criteria met
- [ ] PAI can queue tasks that Cowork executes correctly
- [ ] Task format is stable and Cowork interprets reliably
- [ ] Round-trip time from queue to result feels efficient

---

## When to Revisit

- **Pick up when:** Beginning tool buildout phase; have used Cowork enough to know what tasks are worth automating
- **Upgrade B→D when:** Find yourself manually tracking "things PAI needs from Cowork"
- **Reconsider if:** Anthropic adds persistent memory to Cowork (would change the value prop)

---

## Related

- MEMORY system: `skills/CORE/SYSTEM/MEMORYSYSTEM.md`
- Hook system: `skills/CORE/SYSTEM/THEHOOKSYSTEM.md`
- Existing backlog: `pai-backlog/2026-01-13-feature-persistent-memory-projects.md` (related context problem)
