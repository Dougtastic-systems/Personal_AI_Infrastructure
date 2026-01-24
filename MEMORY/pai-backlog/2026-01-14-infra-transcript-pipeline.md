# Transcript Pipeline: Audio → Structured Knowledge

**Added:** 2026-01-14
**Category:** infra
**Priority:** high
**Preconditions:** None - foundational capability, unblocks multiple other projects

---

## Context

### The Problem

Audio content accumulates faster than it can be processed:
- Meeting recordings pile up
- Brainstorm voice memos sit unprocessed
- Podcast interview content (Melissa backlog) remains untapped
- Handoff from "recorded" to "actionable" is entirely manual

**Current state:** Manual transcription, manual review, manual extraction. Hours of content → hours of processing → eventual abandonment.

**Desired state:** Drop audio file → automatic transcription → structured output → searchable knowledge in MEMORY.

### Why This First

| Factor | Score | Rationale |
|--------|-------|-----------|
| Pain Relief | 5/5 | Eliminates hours of manual work per recording |
| Frequency | 4/5 | Multiple recordings per week |
| Foundation | 4/5 | Same infrastructure serves Brainstorm Ingestion, Melissa Podcast |
| Compounding | 5/5 | Value grows as corpus grows - searchable history |
| Decay Risk | 5/5 | Backlog grows daily, older content loses context |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                      TRANSCRIPT PIPELINE                             │
└─────────────────────────────────────────────────────────────────────┘

INPUT                    PROCESS                         OUTPUT
─────                    ───────                         ──────

Audio File          ┌─────────────┐
  .mp3              │             │
  .m4a    ─────────►│  TRANSCRIBE │─────────► Raw Transcript
  .wav              │  (Whisper)  │              .txt
  .webm             │             │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │             │
Raw Transcript ────►│    CLEAN    │─────────► Clean Transcript
                    │             │           (speaker labels,
                    │             │            timestamps,
                    └─────────────┘            corrections)
                           │
                           ▼
                    ┌─────────────┐
                    │             │
Clean Transcript───►│    MARK     │─────────► Marked Transcript
                    │             │           (semantic markers,
                    │             │            topics, entities)
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │             │           ┌─► Summary.md
Marked Transcript──►│  EXTRACT    │───────────┼─► Tasks.json
                    │             │           ├─► Insights.json
                    │             │           └─► Quotes.json
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │             │
All Artifacts ─────►│   STORE     │─────────► MEMORY/transcripts/
                    │             │              └─► YYYY-MM-DD/
                    └─────────────┘                   └─► [source]/
```

---

## Pipeline Stages

### Stage 1: TRANSCRIBE

**Purpose:** Convert audio to raw text

**Tool:** OpenAI Whisper (local or API)

**Input:**
- Audio file (mp3, m4a, wav, webm, etc.)
- Optional: Speaker hint, language hint

**Output:**
```json
{
  "raw_text": "Full transcription...",
  "segments": [
    {
      "start": 0.0,
      "end": 4.5,
      "text": "Welcome everyone to today's meeting."
    }
  ],
  "language": "en",
  "duration_seconds": 3600
}
```

**Configuration Options:**
| Option | Default | Notes |
|--------|---------|-------|
| Model | `whisper-large-v3` | Local: large-v3, API: whisper-1 |
| Language | auto-detect | Override for known language |
| Word timestamps | true | Enables precise segment alignment |

**Verification:**
- [ ] Output file exists
- [ ] Duration matches input audio (±5%)
- [ ] Language detected correctly

---

### Stage 2: CLEAN

**Purpose:** Transform raw transcript into readable, attributed text

**Operations:**
1. **Speaker Diarization** - Identify and label speakers
2. **Timestamp Normalization** - Consistent format (HH:MM:SS)
3. **Filler Removal** - Remove "um", "uh", "like" (configurable)
4. **Correction Pass** - Fix obvious transcription errors
5. **Paragraph Segmentation** - Break into logical chunks

**Input:** Raw transcript from Stage 1

**Output:**
```markdown
# Meeting Transcript: [Title]
**Date:** 2026-01-14
**Duration:** 1:00:00
**Participants:** Doug, Rick, Sarah

---

## 00:00:00 - Opening

**Doug:** Welcome everyone to today's meeting. We're going to cover three main topics.

**Rick:** Thanks Doug. Before we dive in, I wanted to flag one thing from last week.

## 00:05:23 - Topic 1: Project Status

**Sarah:** Let me share my screen and walk through the current state...
```

**Speaker Identification Approaches:**
| Method | Accuracy | Setup |
|--------|----------|-------|
| Voice fingerprinting | High | Requires voice samples per speaker |
| Context inference | Medium | Claude identifies from content + meeting invite |
| Manual hint | High | Provide speaker list upfront |

**Verification:**
- [ ] Speakers identified and labeled
- [ ] Timestamps present and sequential
- [ ] Readable paragraph structure

---

### Stage 3: MARK

**Purpose:** Add semantic markup for downstream extraction

**Marker Taxonomy:**
```
[ACTION]      - Task or to-do mentioned
[DECISION]    - Decision made or confirmed
[QUESTION]    - Open question raised
[INSIGHT]     - Key insight or realization
[FOLLOWUP]    - Explicit follow-up mentioned
[BLOCKER]     - Blocker or obstacle identified
[IDEA]        - New idea proposed
[REFERENCE]   - External reference (doc, person, system)
[QUOTE]       - Notable quotable statement
[TENSION]     - Disagreement or unresolved tension
```

**Input:** Clean transcript from Stage 2

**Output:**
```markdown
## 00:15:42 - Resource Discussion

**Rick:** I think we need to bring in another developer for this sprint. [IDEA]

**Doug:** Agreed, let's post the req by Friday. [ACTION: Post developer req by Friday] [DECISION: Approved additional headcount]

**Sarah:** Who should own the onboarding? [QUESTION]

**Rick:** "If we don't get this right, we'll be digging out for months." [QUOTE] [INSIGHT: Onboarding quality is critical path]
```

**Marking Approach:**
| Method | Speed | Quality |
|--------|-------|---------|
| Fully automated (Claude) | Fast | Good for obvious markers |
| Human-in-loop review | Slow | High precision |
| Hybrid: auto-mark + review pass | Medium | Best balance |

**Verification:**
- [ ] All ACTION items have owners (if mentioned)
- [ ] DECISION items are clearly stated
- [ ] No obvious markers missed (spot check)

---

### Stage 4: EXTRACT

**Purpose:** Generate structured artifacts from marked transcript

**Output Artifacts:**

#### Summary.md
```markdown
# Meeting Summary: [Title]
**Date:** 2026-01-14 | **Duration:** 1 hour | **Participants:** 3

## TL;DR
One paragraph executive summary.

## Key Decisions
1. Approved additional developer headcount
2. Moved launch date to February 15

## Action Items
| Owner | Action | Due |
|-------|--------|-----|
| Doug | Post developer req | Friday |
| Sarah | Update timeline | EOD |

## Open Questions
- Who owns onboarding?
- Budget implications?

## Notable Insights
- Onboarding quality is critical path
- Customer feedback trending positive
```

#### Tasks.json
```json
{
  "source": "meeting-2026-01-14-project-sync",
  "extracted_at": "2026-01-14T22:30:00Z",
  "tasks": [
    {
      "id": "task-001",
      "description": "Post developer req",
      "owner": "Doug",
      "due": "2026-01-17",
      "context": "Discussed at 00:15:42, approved by group",
      "status": "pending"
    }
  ]
}
```

#### Insights.json
```json
{
  "source": "meeting-2026-01-14-project-sync",
  "insights": [
    {
      "text": "Onboarding quality is critical path",
      "speaker": "Rick",
      "timestamp": "00:16:05",
      "tags": ["process", "risk", "hiring"]
    }
  ]
}
```

#### Quotes.json
```json
{
  "source": "meeting-2026-01-14-project-sync",
  "quotes": [
    {
      "text": "If we don't get this right, we'll be digging out for months.",
      "speaker": "Rick",
      "timestamp": "00:16:02",
      "context": "Discussing onboarding process"
    }
  ]
}
```

**Verification:**
- [ ] Summary accurately reflects content
- [ ] All marked ACTIONs appear in Tasks.json
- [ ] No hallucinated content

---

### Stage 5: STORE

**Purpose:** Archive to MEMORY with consistent structure

**Directory Structure:**
```
${PAI_DIR}/MEMORY/transcripts/
├── 2026-01/
│   ├── meetings/
│   │   └── 2026-01-14-project-sync/
│   │       ├── audio/
│   │       │   └── original.m4a
│   │       ├── raw/
│   │       │   └── whisper-output.json
│   │       ├── clean/
│   │       │   └── transcript.md
│   │       ├── marked/
│   │       │   └── transcript-marked.md
│   │       ├── extracted/
│   │       │   ├── Summary.md
│   │       │   ├── Tasks.json
│   │       │   ├── Insights.json
│   │       │   └── Quotes.json
│   │       └── metadata.json
│   ├── brainstorms/
│   │   └── 2026-01-14-product-ideas/
│   │       └── [same structure]
│   └── interviews/
│       └── 2026-01-10-melissa-guest-jane/
│           └── [same structure]
```

**Metadata.json:**
```json
{
  "id": "2026-01-14-project-sync",
  "type": "meeting",
  "title": "Project Sync",
  "date": "2026-01-14",
  "duration_seconds": 3600,
  "participants": ["Doug", "Rick", "Sarah"],
  "source_file": "audio/original.m4a",
  "pipeline_version": "1.0",
  "processed_at": "2026-01-14T22:30:00Z",
  "stages_completed": ["transcribe", "clean", "mark", "extract", "store"],
  "tags": ["project", "sync", "weekly"]
}
```

**Verification:**
- [ ] All files written to correct locations
- [ ] Metadata.json complete
- [ ] Searchable via grep/glob

---

## Pipeline Execution

### Manual Trigger
```bash
# Process a single file
pai transcript process /path/to/audio.m4a --type meeting --title "Project Sync"

# Process with speaker hints
pai transcript process /path/to/audio.m4a --speakers "Doug,Rick,Sarah"

# Process directory of files
pai transcript batch /path/to/recordings/ --type brainstorm
```

### Automated Trigger (Future)
```
Watch folder: ~/Inbox/Transcripts/
├── meetings/      → auto-process as type=meeting
├── brainstorms/   → auto-process as type=brainstorm
└── interviews/    → auto-process as type=interview
```

### Pipeline Invocation (PAI)
```
User: "Process the recording from today's meeting"
PAI: [Executes Transcript Pipeline]
     [Surfaces Summary.md when complete]
     [Adds tasks to task system if configured]
```

---

## Visual Execution Format

```
Pipeline: Transcript_Process
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input: project-sync-2026-01-14.m4a (1:00:00)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[1/5] ✅ TRANSCRIBE                    PASS (2m 34s)
      ├─ ✅ Whisper large-v3 completed
      ├─ ✅ Language: English (99.2%)
      └─ ✅ 847 segments extracted
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2/5] ✅ CLEAN                         PASS (45s)
      ├─ ✅ 3 speakers identified
      ├─ ✅ Timestamps normalized
      └─ ✅ 127 paragraphs created
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[3/5] ✅ MARK                          PASS (1m 12s)
      ├─ ✅ 8 ACTIONs marked
      ├─ ✅ 3 DECISIONs marked
      ├─ ✅ 5 QUESTIONs marked
      └─ ✅ 12 INSIGHTs marked
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[4/5] ✅ EXTRACT                       PASS (38s)
      ├─ ✅ Summary.md generated
      ├─ ✅ 8 tasks extracted
      ├─ ✅ 12 insights captured
      └─ ✅ 4 quotes saved
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[5/5] ✅ STORE                         PASS (2s)
      └─ ✅ Archived to MEMORY/transcripts/2026-01/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pipeline: COMPLETE ✅
Total time: 5m 11s
Output: ~/.claude/MEMORY/transcripts/2026-01/meetings/2026-01-14-project-sync/
```

---

## Content Type Variations

The pipeline adapts based on content type:

| Type | CLEAN Adjustments | MARK Focus | EXTRACT Output |
|------|-------------------|------------|----------------|
| **Meeting** | Speaker diarization critical | ACTIONs, DECISIONs | Tasks, Summary |
| **Brainstorm** | Single speaker OK | IDEAs, INSIGHTs | Ideas list, themes |
| **Interview** | Q&A structure | QUOTEs, INSIGHTs | Highlights, soundbites |
| **Lecture** | Chapter detection | REFERENCEs, INSIGHTs | Notes, key concepts |
| **Voice Memo** | Minimal cleanup | ACTIONs, IDEAs | Quick capture → inbox |

---

## Integration Points

### With Existing PAI Systems

| System | Integration |
|--------|-------------|
| **MEMORY** | All outputs stored in structured archive |
| **Work Packets** | Extracted tasks feed into packet preparation |
| **Daily Brief** | New transcripts surfaced in morning brief |
| **Graph Memory** | Insights + entities become graph nodes (future) |
| **Contacts** | Speaker names link to contact records |

### With Future Projects

| Project | How Pipeline Helps |
|---------|-------------------|
| **Brainstorm Ingestion** | Same TRANSCRIBE + CLEAN stages, lighter MARK |
| **Melissa Podcast** | Same pipeline, EXTRACT tuned for soundbites |
| **Chat History** | Similar MARK + EXTRACT pattern (text input) |

---

## Technology Options

### Transcription Engine

| Option | Pros | Cons | Cost |
|--------|------|------|------|
| **Whisper Local** | Free, private, no API limits | Requires GPU, slower | $0 |
| **Whisper API** | Fast, no hardware needed | Per-minute cost, data leaves machine | ~$0.006/min |
| **AssemblyAI** | Speaker diarization built-in | Higher cost | ~$0.015/min |
| **Deepgram** | Fast, good diarization | Cost | ~$0.015/min |

**Recommendation:** Start with Whisper API for speed, evaluate local for cost at scale.

### Speaker Diarization

| Option | Accuracy | Setup |
|--------|----------|-------|
| **pyannote** | High | Local, requires model download |
| **AssemblyAI** | High | API, built into transcription |
| **Claude inference** | Medium | No setup, uses context clues |

**Recommendation:** Claude inference for MVP, pyannote for production accuracy.

---

## Implementation Phases

### Phase 1: MVP (Target: Working Pipeline)
- [ ] Whisper transcription (API)
- [ ] Basic CLEAN (timestamps, paragraphs)
- [ ] Claude-based MARK (automated)
- [ ] Summary.md extraction
- [ ] MEMORY storage

**Success:** Can drop an audio file and get Summary.md

### Phase 2: Quality (Target: Production Ready)
- [ ] Speaker diarization
- [ ] Human-in-loop MARK review option
- [ ] Full artifact extraction (Tasks, Insights, Quotes)
- [ ] Batch processing

**Success:** 10 recordings processed with consistent quality

### Phase 3: Integration (Target: System Connected)
- [ ] Tasks → Work Packet System
- [ ] Insights → Graph Memory
- [ ] Daily Brief surfacing
- [ ] Watch folder automation

**Success:** Recordings automatically appear in daily workflow

---

## Success Criteria

**Pipeline is working when:**
- [ ] Can process 1-hour recording in <10 minutes
- [ ] Speaker identification >80% accurate
- [ ] Summary captures key points (spot check)
- [ ] Tasks extracted match manual review
- [ ] Searchable in MEMORY via grep

**Pipeline is valuable when:**
- [ ] Backlog is cleared (all pending recordings processed)
- [ ] New recordings processed same-day
- [ ] You reference transcripts in other work
- [ ] Tasks flow into daily workflow

---

## Failure Modes

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Transcription garbage | Summary nonsensical | Re-run with different model/settings |
| Speaker misattribution | Wrong names in output | Manual correction, add voice samples |
| Marker overload | Too many markers, noise | Tune marker sensitivity |
| Storage full | Write fails | Archive old transcripts, expand storage |
| API rate limit | 429 errors | Queue + retry, or switch to local |

---

## Open Questions (For Tomorrow)

1. **Master source for meetings?** Calendar integration to auto-name/tag?
2. **Speaker voice samples?** Worth the setup for accuracy?
3. **Review workflow?** Full automation vs human-in-loop for MARK?
4. **Task destination?** Where do extracted tasks go? (Calendar, Todoist, PAI task system?)
5. **Retention policy?** Keep audio forever or delete after processing?
6. **Batch priority?** Process oldest first or most recent?

---

## Related

- Brainstorm Ingestion (shares infrastructure)
- Melissa Podcast Backlog (same pipeline, different EXTRACT)
- Pipeline Library (this becomes template)
- MEMORY System: `skills/CORE/SYSTEM/MEMORYSYSTEM.md`
- Pipelines: `skills/CORE/SYSTEM/PIPELINES.md`
