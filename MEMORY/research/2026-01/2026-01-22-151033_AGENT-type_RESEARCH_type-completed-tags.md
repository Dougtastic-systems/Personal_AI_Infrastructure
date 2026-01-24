---
capture_type: RESEARCH
timestamp: 2026-01-22 15:10:33 PST
executor: type
agent_completion: Type completed ` tags)
---

# RESEARCH: Type completed ` tags)

**Agent:** type
**Completed:** 2026:01:22:151033

---

## Agent Output

Perfect! Now I have a complete picture. Let me provide the comprehensive survey.

---

## PAI Memory System - Complete Survey

### 1. DIRECTORY STRUCTURE

The memory system is located at `~/.claude/MEMORY/` and contains 19 top-level directories:

```
MEMORY/ (8.0 MB total, 974 files, 6 days old - live and active)
├── WORK/                    # Work session tracking (89 sessions)
├── learning/                # Learning captures with categorization
│   ├── ALGORITHM/           # Task execution learnings
│   ├── SYSTEM/              # Tooling & infrastructure learnings
│   ├── SIGNALS/             # Sentiment ratings (ratings.jsonl)
│   └── nate-b-jones/        # External learning sources
├── learnings/               # Static learning documents
├── continuations/           # 18 continuation files (active)
├── captured/                # Ingestion pipeline
│   ├── raw/                 # Source data (PDFs, meeting notes, drops)
│   ├── processed/           # Processed captures
│   ├── exports/             # Exported data
│   ├── index/               # Pending ingestion index (pending-ingestion.jsonl)
│   └── templates/           # Capture templates
├── State/                   # Runtime operational state (6 JSON files)
├── research/                # Research outputs (timestamped)
├── sessions/                # Session summaries (empty - See note below)
├── pai-backlog/             # Project backlog items
├── decisions/               # Architectural decision records (empty)
├── execution/               # Task execution logs (empty)
├── recovery/                # Recovery snapshots (empty)
├── raw-outputs/             # Raw JSONL event streams (empty)
├── backups/                 # Pre-change backups (empty)
├── security/                # Security events & audit logs
├── VOICE/                   # Voice event tracking
└── README.md                # System documentation
```

### 2. FILE FORMATS

The system uses multiple file formats depending on purpose:

| Format | Usage | Location | Count | Example |
|--------|-------|----------|-------|---------|
| **JSONL** | Event logs, ratings, transcripts | SIGNALS/, captured/, WORK/ | 164 files | `ratings.jsonl` (244 entries), `IdealState.jsonl`, `voice.jsonl` |
| **Markdown** | Learning captures, continuations, documentation | learning/ALGORITHM/, learnings/, continuations/ | 406 files | `2026-01-22-145709_LEARNING_sentiment-rating-5.md` |
| **YAML** | Work session metadata, task items | WORK/*/items/, META.yaml | 364 files | `META.yaml`, task items (`001-*.yaml`) |
| **JSON** | State files, metadata | State/, captured/index/ | Multiple | `current-work.json`, `*.meta.json` |
| **HTML** | Rendered reports | learnings/, research/ | 2 files | `v2.3-CAPABILITY-ANALYSIS.html` |
| **PDF** | Source documents | captured/raw/ | Multiple | Meeting notes, research papers |
| **TXT** | Raw captures, meeting notes | captured/raw/ | Multiple | Drop folder captures |

### 3. WHAT GETS CAPTURED AUTOMATICALLY

The system captures data through **5 hook events**. All currently active:

#### **UserPromptSubmit** - User Input Analysis
**When:** User submits a prompt
**Captures to:** `MEMORY/learning/SIGNALS/ratings.jsonl`
**What:**
- Explicit ratings: Single number (1-10) like "7" or "8 - good work"
- Implicit sentiment: Emotional tone analysis (frustration, excitement, neutral)
- Confidence scores (0.0-1.0)
- Timestamp + session_id + source ("explicit" vs "implicit")

**Hooks:**
- `ExplicitRatingCapture.hook.ts` - Detects ratings syntax
- `ImplicitSentimentCapture.hook.ts` - AI sentiment analysis (uses Sonnet inference, standard level)
- `UpdateTabTitle.hook.ts` - Updates terminal tab with context

**Data Volume:** 244 total ratings entries (mix of explicit and implicit)

#### **Stop** - Main Agent Completion
**When:** Main agent ({PAI}) finishes response
**Captures to:** `MEMORY/WORK/`, `MEMORY/learning/ALGORITHM/`, voice events
**What:**
- Work item updates (session context)
- Learning moments (auto-detected via pattern matching: 2+ indicators like "bug/fixed/troubleshoot/lesson")
- Structured sections: `📋 SUMMARY`, `🔍 ANALYSIS`, `⚡ ACTIONS`, `✅ RESULTS`, `📊 STATUS`, `➡️ NEXT`
- Voice notification extraction (`🎯 COMPLETED:` line)
- Tab state finalization (color + suffix)

**Hooks:**
- `StopOrchestrator.hook.ts` (unified handler with 3 sub-handlers):
  - `handlers/voice.ts` - Voice TTS delivery
  - `handlers/capture.ts` - Work/learning capture + observability
  - `handlers/tab-state.ts` - Tab color/state

**Known Issue:** Stop event not firing reliably - documented workaround with CAPTURE field in responses

#### **SubagentStop** - Agent Task Completion
**When:** Task tool (subagent) finishes
**Captures to:** `MEMORY/research/`, `MEMORY/execution/`, observability
**What:**
- Agent type detection (`[AGENT:type]` tags)
- Agent output capture
- observability events

**Hooks:**
- `AgentOutputCapture.hook.ts`

#### **SessionStart** - Session Initialization
**When:** New Claude Code session begins
**Captures to:** Context injection (system-reminder)
**What:**
- PAI context loaded from `skills/CORE/SKILL.md`
- Version checking

**Hooks:**
- `LoadContext.hook.ts`
- `CheckVersion.hook.ts`

#### **SessionEnd** - Session Cleanup
**When:** Session terminates
**Captures to:** State file updates
**What:**
- Work directory completion marking
- Session duration tracking

**Hooks:**
- `SessionSummary.hook.ts`

### 4. CAPTURE TRIGGERS & TIMING

#### Trigger Patterns:

| Trigger | Handler | Latency | Blocking | Destination |
|---------|---------|---------|----------|-------------|
| User types "7 - great" | ExplicitRatingCapture | Immediate | No | ratings.jsonl |
| User types any message | ImplicitSentimentCapture | 2-5s (Sonnet) | No | ratings.jsonl + learning/ALGORITHM if rating<6 |
| Main agent completes response | Stop orchestrator | 1-2s | No | WORK/, learning/, voice |
| Task tool finishes | AgentOutputCapture | <1s | No | research/, observability |
| New session starts | LoadContext | <100ms | Yes | Context injection |
| Session ends | SessionSummary | <500ms | No | State updates |

#### Automatic vs. Manual:
- **Automatic:** UserPromptSubmit hooks run always (explicit + implicit)
- **Automatic:** Stop hooks attempt to run but have reliability issues (documented)
- **Manual fallback:** CAPTURE field in responses forces manual verification
- **Manual trigger:** Work can be manually created via `/THEALGORITHM` or `TodoWrite`

### 5. FILE NAMING CONVENTIONS

#### Work Sessions:
```
WORK/{timestamp}_{truncated-prompt}/
  ├── META.yaml                    # Metadata (id, created_at, status, session_id)
  ├── IDEAL.md                     # Ideal state criteria
  ├── IdealState.jsonl             # ISC progress tracking
  ├── voice.jsonl                  # Voice events
  └── items/
      ├── 001-{task-name}.yaml     # Individual task items
      ├── 002-{task-name}.yaml
      └── ...
```

**Example:** `20260122-150643_im-not-sure-please-perform-a-survey-of-how-cur/`

#### Learning Captures:
```
learning/{CATEGORY}/{YYYY-MM}/{timestamp}_{TYPE}_{description}.md
```

**Example:** `2026-01-22-145709_LEARNING_sentiment-rating-5.md`
**Categories:** ALGORITHM (task execution), SYSTEM (tooling/infra)

#### Ratings Log:
```
learning/SIGNALS/ratings.jsonl
```

Each line is a JSON object with timestamp, rating, session_id, source, sentiment_summary, confidence.

#### Captured Documents:
```
captured/raw/{YYYY-MM-DD}/{timestamp}_{source}_{filename}
captured/raw/{YYYY-MM-DD}/{timestamp}_{source}_{filename}.meta.json
```

**Example:** `111907_drop_graphiti-test.txt` + `111907_drop_graphiti-test.txt.meta.json`
**Sources:** drop, meeting, chat, etc.

#### State Files:
```
State/current-work.json         # Current session's work
State/integrity-state.json      # System integrity status
State/location-cache.json       # Cached location data
State/model-cache.txt           # Current model name
State/weather-cache.json        # Cached weather
```

### 6. DATA GRANULARITY & DEPTH

#### Per-Prompt Capture:
- **Timestamp:** ISO8601 + PST components
- **Session ID:** UUID linking all artifacts from one conversation
- **Sentiment:** 1-10 numeric rating + text summary + confidence (0.0-1.0)
- **Source:** "implicit" or "explicit" or "user" defined

#### Per-Response Capture:
- **Structured sections:** Emoji-prefixed (📋, 🔍, ⚡, ✅, 📊, ➡️, 🎯)
- **Work lineage:** Files changed, tools used, agents spawned
- **Learning indicators:** Auto-detection of 2+ learning keywords
- **Tab state:** Color code + suffix + working/completion status

#### Per-Session Capture:
- **Session metadata:** ID, creation timestamp, item count
- **Work progress:** Ideal state criteria tracking (ISC)
- **Voice events:** TTS delivery logs with message content
- **Work items:** Individual task status (pending/in_progress/completed)

#### Per-Continuation:
- **Full session context:** Work directory + all session artifacts
- **Current state:** Latest IDEAL.md definition
- **Task list:** All items with metadata
- **Session link:** Reference to parent work session

### 7. CURRENT VOLUME & ACTIVITY

| Metric | Value | Notes |
|--------|-------|-------|
| **Total files** | 974 | Including all formats |
| **Markdown** | 406 | Learning captures + documentation |
| **JSONL** | 164 | Event logs + ratings + transcripts |
| **YAML** | 364 | Work metadata + task items |
| **Directory size** | 8.0 MB | Lean architecture (mostly text) |
| **Oldest file** | 6 days | Data from Jan 16, 2026 |
| **Recent activity** | 974 files modified last 30 days | 100% of directory active |
| **Work sessions** | 89 tracked | 20260116-161100 through 20260122-150643 |
| **Learning entries** | 100+ in ALGORITHM/2026-01 | Most are sentiment-rated |
| **Ratings logged** | 244 total entries | Mix of explicit (estimated 20%) + implicit (80%) |
| **Continuations** | 18 active | For session resumption |
| **Research captures** | 10+ documented | Graphiti temporal KG focus |

### 8. HOOK SYSTEM ARCHITECTURE

All captures are driven by **5 hook types** firing at specific events:

```
UserPromptSubmit
  ├── ExplicitRatingCapture.hook.ts     → ratings.jsonl + learning if <6
  ├── ImplicitSentimentCapture.hook.ts  → ratings.jsonl + learning if <6
  └── UpdateTabTitle.hook.ts            → Terminal tab updates

Stop
  ├── StopOrchestrator.hook.ts (main)
  │   ├── handlers/voice.ts             → Voice TTS delivery
  │   ├── handlers/capture.ts           → Work/learning capture
  │   └── handlers/tab-state.ts         → Tab color/state finalization
  └── (KNOWN ISSUE: Unreliable firing)

SubagentStop
  └── AgentOutputCapture.hook.ts        → research/ + execution/ by agent type

SessionStart
  ├── LoadContext.hook.ts               → PAI context injection
  └── CheckVersion.hook.ts              → Version checking

SessionEnd
  └── SessionSummary.hook.ts            → State cleanup
```

**Hooks location:** `~/.claude/hooks/`
**Configuration:** `~/.claude/settings.json` (hooks section)
**Execution:** All async, non-blocking, fail gracefully

### 9. KEY OBSERVATIONS

#### What's Working Well:
1. **UserPromptSubmit hooks** - Capturing ratings consistently (244 entries)
2. **Work session tracking** - 89 sessions with full metadata
3. **Learning categorization** - ALGORITHM/SYSTEM split is clean
4. **Continuation system** - 18 active files for session resumption
5. **Captured document pipeline** - PDFs, meeting notes, drops tracked

#### Known Issues:
1. **Stop event reliability** - Not firing consistently (documented workaround)
2. **Empty directories** - `sessions/`, `decisions/`, `execution/`, `recovery/`, `raw-outputs/` are empty
3. **Implicit vs. Explicit split** - Implicit captures overwhelming (80% of ratings)

#### Design Patterns:
1. **Fail-open:** Hooks never block - all non-blocking execution
2. **Fire-and-forget:** Background processes for slow operations (Sonnet inference)
3. **Multiple formats:** Same data in different views (JSONL for querying, MD for reading)
4. **Session linking:** Everything tied to session_id UUID for traceability
5. **PST timezone:** All timestamps normalized to PST (consistency across US timezones)

### 10. CONCRETE EXAMPLES

#### Example 1: Implicit Rating Entry
```json
{
  "timestamp": "2026-01-22T14:57:09-08:00",
  "rating": 5,
  "session_id": "566dae7e-c38a-48d3-a8cb-52aa70a79427",
  "source": "implicit",
  "sentiment_summary": "Technical question about sprint planning",
  "confidence": 0.9
}
```

#### Example 2: Work Session Directory
```
WORK/20260122-150643_im-not-sure-please-perform-a-survey-of-how-cur/
├── META.yaml                          # Contains: id, title, created_at, status, session_id
├── IDEAL.md                           # "To be defined" (not yet filled in)
├── IdealState.jsonl                   # ISC tracking
├── voice.jsonl                        # Voice events
└── items/
    └── 001-im-not-sure-please-perform.yaml
```

#### Example 3: Learning Capture Format
```markdown
---
capture_type: LEARNING
timestamp: 2026-01-22 14:57:09 PST
rating: 5
source: implicit-sentiment
auto_captured: true
tags: [sentiment-detected, implicit-rating, improvement-opportunity]
---

# Implicit Low Rating Detected: 5/10
[Detailed analysis of what triggered capture and why...]
```

#### Example 4: Captured Document Metadata
```json
{
  "id": "2026-01-21-191907-drop-graphiti-test-txt",
  "captured_at": "2026-01-21T19:19:07.211Z",
  "source": "drop",
  "source_details": {
    "original_filename": "graphiti-test.txt",
    "drop_path": "/Users/DSnyder/Inbox/drop/graphiti-test.txt"
  },
  "file_info": {
    "size_bytes": 117,
    "mime_type": "text/plain",
    "extension": ".txt"
  },
  "processing": {
    "status": "raw",
    "history": [{ "level": "raw", "at": "2026-01-21T19:19:07.211Z" }]
  },
  "stored_at": {
    "inbox_raw": "/Users/DSnyder/Inbox/raw/2026-01-21/111907_drop_graphiti-test.txt",
    "memory_raw": "/Users/DSnyder/.claude/MEMORY/captured/raw/2026-01-21/111907_drop_graphiti-test.txt"
  }
}
```

---

## Summary

The PAI memory system is a **sophisticated, hook-driven capture pipeline** that automatically documents work sessions, captures sentiment ratings, tracks learning moments, and ingests external documents. It uses a **multi-format architecture** (JSONL for events, Markdown for learnings, YAML for metadata) to support both machine querying and human reading. The system is **active and live** (8.0 MB, 974 files, all modified in last 30 days) with strong tracking on work sessions (89) and ratings (244 entries), though some components like Stop event handling have reliability issues that are being mitigated with manual verification gates.
agentId: ad95d26 (for resuming to continue this agent's work if needed)

---

## Metadata

**Transcript:** `/Users/DSnyder/.claude/projects/-Users-DSnyder/a5dd84a6-76a5-46cc-8e60-df7d24f9c8d6.jsonl`
**Captured:** 2026-01-22 15:10:33 PST

---

*This output was automatically captured by UOCS SubagentStop hook.*
