# Universal Capture System: Multi-Path Ingest → Process → Structure

**Added:** 2026-01-17
**Category:** infra
**Priority:** **HIGH** — foundational, unlocks multiple blocked projects
**Preconditions:** None — start immediately

---

## Executive Summary

A unified capture system that handles ALL sources of thinking (voice, text, files, email, AI chats) through one pipeline. Philosophy: **capture now with minimal friction, structure later if valuable.**

Two-pass architecture:
1. **Pass 1 (Ingest):** Get it in fast, tag source, timestamp, minimal metadata
2. **Pass 2 (Process):** On-demand structuring with configurable fidelity

---

## The Problem

Good thinking enters through 4+ doors but there's no unified processing system:

```
CURRENT STATE (Fragmented)
──────────────────────────
Voice Memos ───► 📁 Pile up
Meetings ───────► 📁 Pile up
Text to Self ───► 📁 Never processed
AI Chats ───────► 📁 Lost
Notes ──────────► 📁 Scattered
                    ↓
              [MANUAL EXTRACTION]
                    ↓
              (rarely happens)
```

**Core insight:** The friction is in capture, not processing. If capture is frictionless, processing can wait.

---

## Architecture Overview

```
UNIVERSAL CAPTURE SYSTEM
────────────────────────

CAPTURE PATHS           UNIVERSAL INBOX        PROCESSING             MEMORY
─────────────           ───────────────        ──────────             ──────

Drop File ──────┐
Text to Number ─┤       ~/Inbox/
Voice Memo ─────┼──────► drop/     ──► FileWatcher ──► Metadata ──► MEMORY/captured/raw/
Email Forward ──┤        raw/                                           │
AI Chat Export ─┘        meta/                                          ▼
                                                                    [On Demand]
                                                                         │
                                                                         ▼
                                                                    MEMORY/captured/processed/
```

---

## Core Design Principles

1. **One inbox, many sources** — Everything enters `~/Inbox/drop/` regardless of origin
2. **Minimal friction capture** — Get it in now, structure later
3. **Metadata on ingest** — Every item gets timestamp, source, basic tags automatically
4. **Processing is optional** — Raw capture has value; full processing is on-demand
5. **Reprocessing enabled** — Can always re-process with higher fidelity later
6. **Single destination** — All processed thinking lives in `MEMORY/captured/`

---

## Folder Structure

```
~/Inbox/                              # CAPTURE ENTRY POINT
├── drop/                             # Drop any file here
│   └── [files waiting for processing]
├── raw/                              # Processed files move here
│   └── YYYY-MM-DD/
│       ├── HHMMSS_source_name.ext
│       └── HHMMSS_source_name.meta.json
└── archive/                          # Successfully stored items
    └── YYYY-MM-DD/

~/.claude/MEMORY/captured/            # STRUCTURED STORAGE
├── raw/                              # Pass 1 output: minimal processing
│   └── YYYY-MM-DD/
│       ├── HHMMSS_audio_meeting-rick.md
│       └── HHMMSS_text_quick-idea.md
├── processed/                        # Pass 2 output: full structure
│   └── YYYY-MM-DD/
│       └── meeting-rick/
│           ├── transcript.md
│           ├── summary.md
│           ├── tasks.json
│           └── insights.json
└── index/
    ├── unprocessed.json              # What hasn't been fully processed
    └── tags.json                     # Tag → items mapping
```

---

## Metadata Schema

Every captured item gets this on ingest:

```json
{
  "id": "2026-01-17-153000-sms-idea",
  "captured_at": "2026-01-17T15:30:00Z",
  "source": "drop|sms|email|voice|chat|manual",
  "source_details": {
    "original_filename": "meeting-rick.mp3",
    "phone_number": "+1234567890",
    "email_from": "someone@example.com"
  },
  "file_info": {
    "size_bytes": 45000000,
    "mime_type": "audio/mpeg",
    "duration_seconds": 3600
  },
  "auto_tags": ["meeting", "rick"],
  "manual_tags": [],
  "processing": {
    "status": "raw|skimmed|summarized|full|deep",
    "history": [
      {"level": "raw", "at": "2026-01-17T15:30:00Z"}
    ]
  },
  "content_preview": "First 200 chars or transcription snippet..."
}
```

---

## Capture Paths

### Path Priority Order

| Priority | Path | Friction Now | Effort | Status |
|----------|------|--------------|--------|--------|
| **P0** | Drop File | Medium | Low (15 min) | Build first |
| **P1** | Text to Number | High | Medium (2-3 hrs) | Build second |
| **P2** | Voice Memo | Very High | Medium (2-3 hrs) | Build third |
| **P3** | Email Forward | Medium | Medium (2-3 hrs) | Build fourth |
| **P4** | AI Chat Export | High | Medium (2-3 hrs) | Build fifth |
| **P5** | Verbal Live | Very High | Higher (4-5 hrs) | Defer (use ChatGPT voice for now) |

---

### P0: Drop File (Foundation)

**What:** Drop any file into `~/Inbox/drop/` and it gets auto-ingested.

**Implementation:**
```typescript
// FileWatcher watching ~/Inbox/drop/
// On new file:
// 1. Generate metadata
// 2. Move to ~/Inbox/raw/YYYY-MM-DD/HHMMSS_drop_filename.ext
// 3. Create .meta.json alongside
// 4. Copy to MEMORY/captured/raw/YYYY-MM-DD/
// 5. Update unprocessed index
```

**Supported formats:**
- Audio: mp3, m4a, wav, webm, ogg
- Text: txt, md, json, html
- Documents: pdf, docx
- Images: png, jpg (for OCR later)

---

### P1: Text to Number

**What:** SMS or WhatsApp to a capture number → auto-ingested.

**UX:**
```
Your Phone                     PAI System
──────────                     ──────────
"Idea: Meeting prep            Twilio Webhook
packets could be auto-              │
generated from calendar"            ▼
        │                    ~/Inbox/raw/2026-01-17/
        ▼                    153000_sms_idea.md
  SMS to capture #
```

**Auto-tagging prefixes:**
- `Idea:` → tag: idea
- `Todo:` → tag: task
- `Note:` → tag: note
- `Remind:` → tag: reminder
- `Q:` → tag: question
- (no prefix) → tag: quick-capture

**Implementation:**
```typescript
// Twilio webhook receives SMS/WhatsApp
// 1. Extract body, media URLs, sender
// 2. Parse prefix for auto-tag
// 3. Download any media attachments
// 4. Write to ~/Inbox/raw/YYYY-MM-DD/HHMMSS_sms_tag.md
// 5. Generate metadata
// 6. Copy to MEMORY/captured/raw/
```

---

### P2: Voice Memo Transcribe

**What:** Drop voice recording → auto-transcribe via Whisper → store as text.

**UX:**
```
Drop: brainstorm-20260117.m4a
      │
      ▼
Whisper transcribes
      │
      ▼
MEMORY/captured/raw/2026-01-17/
└── 160000_voice_brainstorm.md
    ---
    source: voice
    original: brainstorm-20260117.m4a
    duration: 12:34
    ---
    [Full transcription text]
```

**Implementation:**
- Whisper API (fast) or local Whisper (free)
- FileWatcher detects audio in drop/
- Auto-transcribe, store transcription + original audio reference

---

### P3: Email Forward

**What:** Forward email to capture@yourdomain.com → ingested.

**Implementation:**
- Simple SMTP receiver or use existing email service webhook
- Parse subject, body, attachments
- Store as markdown with attachments

---

### P4: AI Chat Export (PRIMARY MODALITY)

**What:** Export ChatGPT/Claude/Perplexity conversations → drop → parsed.

**CRITICAL INSIGHT:** ChatGPT voice capture is Doug's primary verbal-to-output modality. This path needs special handling:

**Two Content Streams:**
1. **USER statements** — Doug's raw thinking (source truth, reprocessable)
2. **GPT responses** — Already-processed structuring (valuable but secondary)

**CustomGPT Capture Agent Design:**
- Create dedicated ChatGPT CustomGPT for capture sessions
- Output format clearly marks `[USER]:` vs `[GPT]:`
- Structured export (JSON or markdown)
- Drop to `~/Inbox/drop/`

**Implementation:**
- Detect JSON/HTML export formats
- Parse conversation structure with stream separation
- Tag USER statements as `source:primary`
- Tag GPT responses as `source:gpt-structured`
- Enable re-processing USER statements with Claude tools later
- Store as threaded markdown with stream metadata

**Data Model:**
```json
{
  "source": "chat-export",
  "source_details": {
    "platform": "chatgpt|claude|perplexity",
    "conversation_type": "voice-capture|text|mixed",
    "custom_gpt": "CaptureAgent"
  },
  "content_streams": {
    "user_statements": [...],      // Source truth - reprocessable
    "assistant_responses": [...]   // Already processed
  }
}
```

---

### P5: Verbal Live Processing (Deferred)

**What:** Real-time voice → structured capture.

**Current workaround:** Use ChatGPT voice mode, then export transcript to drop folder.

**Future:** Live Whisper + intent detection + real-time ingest.

---

## Processing Levels

When you want to process a captured item:

| Level | What It Does | Output | Use Case |
|-------|--------------|--------|----------|
| **raw** | Just ingest | Metadata + original | Capture happened |
| **skim** | Title + 1-line + auto-tags | Quick summary | "What's in my inbox?" |
| **summary** | 1-paragraph summary | Brief | "Quick brief on this" |
| **full** | MARK + EXTRACT | Tasks, insights, quotes | "I need to act on this" |
| **deep** | Full + cross-reference | Linked to MEMORY | "Connect to everything" |

**Processing command pattern:**
```bash
# Process specific item
pai capture process ITEM_ID --level full

# Process all unprocessed at skim level
pai capture process --pending --level skim

# Reprocess with higher fidelity
pai capture process ITEM_ID --level deep
```

---

## Integration Points

### SessionStart Hook

```
📥 Capture Inbox: 7 items pending
   - 3 voice memos (unprocessed)
   - 2 quick texts (raw)
   - 1 email forward (raw)
   - 1 AI chat export (raw)
```

### Daily Brief

Include capture summary:
- New items captured today
- Items processed
- Oldest unprocessed item
- Suggested items to process (high-value signals)

### Continuations

Extracted tasks can create continuation entries for follow-up.

---

## Implementation Roadmap

### Phase 1: Foundation (This Session)

| Task | Effort | Output |
|------|--------|--------|
| Create folder structure | 5 min | ~/Inbox/{drop,raw,archive}, MEMORY/captured/{raw,processed,index} |
| FileWatcher script | 1 hr | Watches drop/, generates metadata, moves files |
| Metadata generator | 30 min | Creates .meta.json for any file |
| Unprocessed index | 30 min | Tracks what hasn't been processed |

**Deliverable:** Drop any file → it's tracked, timestamped, findable

### Phase 2: Text to Number (Next Session)

| Task | Effort | Output |
|------|--------|--------|
| Provision Twilio number | 15 min | Phone number for capture |
| Webhook endpoint | 1 hr | Receives SMS/WhatsApp, stores |
| Prefix parsing | 30 min | Auto-tag based on Idea:/Todo:/etc |
| Media handling | 30 min | Download and store MMS images |

**Deliverable:** Text thoughts to number → they're captured

### Phase 3: Voice Processing (Following Session)

| Task | Effort | Output |
|------|--------|--------|
| Whisper integration | 1 hr | API or local model |
| Audio detection in FileWatcher | 30 min | Trigger transcription on audio drop |
| Transcription storage | 30 min | Store text + reference original |

**Deliverable:** Drop voice memo → auto-transcribed and stored

### Phase 4: Processing Pipeline (When Ready)

| Task | Effort | Output |
|------|--------|--------|
| Skim processor | 1 hr | Title + summary + tags |
| Full processor (MARK + EXTRACT) | 3 hrs | Tasks, insights, quotes |
| Processing CLI | 1 hr | `pai capture process` commands |

**Deliverable:** On-demand processing at any fidelity level

### Phase 5: Integration (When Pipeline Stable)

| Task | Effort | Output |
|------|--------|--------|
| SessionStart hook integration | 30 min | Surface unprocessed count |
| Daily Brief integration | 1 hr | Include capture summary |
| Task → Continuation flow | 2 hrs | Extracted tasks create continuations |

---

## Success Criteria

**Phase 1 is complete when:**
- [ ] Can drop any file into ~/Inbox/drop/
- [ ] File automatically gets metadata and moves to raw/
- [ ] Metadata includes timestamp, source, size, mime type
- [ ] Can query "what's unprocessed?"

**System is working when:**
- [ ] Capture friction is effectively zero
- [ ] "Where did I think about X?" has one answer: search MEMORY/captured/
- [ ] Backlog of unprocessed items stays manageable
- [ ] Processing on-demand works reliably

**System is valuable when:**
- [ ] You actually capture thoughts that would have been lost
- [ ] Processed items produce actionable tasks
- [ ] Cross-session thinking is preserved and findable

---

## Failure Modes

| Failure | Detection | Recovery |
|---------|-----------|----------|
| FileWatcher crashes | No new items appearing | Check process, restart |
| Whisper fails | Audio stays unprocessed | Re-queue, check API key |
| Twilio webhook down | SMS not arriving | Check Twilio console |
| Storage full | Write errors | Archive old items, expand |
| Over-capture | Inbox overwhelming | Batch process, tighten filters |

---

## Open Questions

1. **Retention policy:** Keep raw audio forever or delete after transcription?
2. **Duplicate detection:** Handle re-drops of same file?
3. **Privacy boundaries:** What about sensitive captures (health, financial)?
4. **Mobile access:** How to query captures from phone?
5. **Backup strategy:** Where does MEMORY/captured/ get backed up?

---

## Related Backlog Items

| Item | Relationship |
|------|--------------|
| Transcript Pipeline | Subset - audio processing is P2 of this system |
| Dual-Channel Messaging | Overlaps - SMS capture is P1 of this system |
| Brainstorm Ingestion | Use case - voice brainstorms flow through this |
| Chat History Ingestion | Use case - AI chat exports flow through this |
| Daily Brief System | Consumer - surfaces capture inbox status |

---

## Version History

| Date | Change |
|------|--------|
| 2026-01-17 | Initial architecture spec created |

