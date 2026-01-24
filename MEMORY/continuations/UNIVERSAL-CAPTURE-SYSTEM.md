# Continuation: Universal Capture System Build

**Last Updated:** 2026-01-17
**Status:** Phase 1 Complete, Phase 2 Ready (Cloudflare + Twilio)

---

## Executive Summary

Building a 24/7 multi-modal capture system. Phase 1 (local drop folder) complete. Phase 2 will add SMS/WhatsApp capture via Twilio + Cloudflare Worker + R2 storage.

**Key Decision Made:** Cloudflare as PAI cloud infrastructure layer for:
- Capture message storage (R2)
- Always-on webhooks (Workers)
- Neo4j backups (R2)
- Future: Family meal planning UI (Pages)

---

## What's Already Built (Phase 1)

- [x] `~/Inbox/{drop,raw,archive}` folder structure
- [x] `~/.claude/MEMORY/captured/{raw,processed,index}` storage
- [x] `~/.claude/tools/CaptureIngest.ts` — FileWatcher + metadata generator
- [x] `capture` command — `capture status`, `capture process`, `capture watch`

**How to use now:**
```bash
# Drop any file to capture it
cp myfile.txt ~/Inbox/drop/

# Process dropped files
capture process

# Check status
capture status
```

---

## Phase 2: Cloudflare + Twilio (24/7 SMS/WhatsApp Capture)

### Architecture

```
You (phone)
    │
    ▼
SMS/WhatsApp → Twilio → Cloudflare Worker → R2 Bucket (JSONL)
                              │
                              ▼
                    Mac pulls on wake/schedule
                              │
                              ▼
                    ~/Inbox/raw/ → CaptureIngest → MEMORY/captured/
```

### Phase 2A: Cloudflare Foundation (~30 min)

1. [ ] Create Cloudflare account at cloudflare.com (free)
2. [ ] Create R2 bucket: `pai-capture`
3. [ ] Create R2 bucket: `pai-backups` (for Neo4j later)
4. [ ] Generate API token with R2 read/write permissions
5. [ ] Store credentials securely (`.env` or macOS Keychain)

**Verification:** Can upload/download test file to R2 from Mac

### Phase 2B: Twilio Setup (~15 min)

1. [ ] Create Twilio account at twilio.com
2. [ ] Provision phone number (~$1.15/mo)
3. [ ] Join WhatsApp Sandbox (free for testing)
4. [ ] Note Account SID and Auth Token

**Verification:** Can send test SMS from Twilio console

### Phase 2C: Cloudflare Worker Webhook (~1-2 hours)

Build worker that:
1. [ ] Receives POST from Twilio webhook
2. [ ] Validates `X-Twilio-Signature` with Auth Token
3. [ ] Parses message: From, Body, MediaUrls
4. [ ] Applies prefix parsing for auto-tags:
   - `Idea:` → tag: idea
   - `Todo:` → tag: task
   - `Note:` → tag: note
   - `Remind:` → tag: reminder
   - `Q:` → tag: question
5. [ ] Normalizes to JSON schema
6. [ ] Appends to R2: `pai-capture/inbox/YYYY-MM-DD.jsonl`
7. [ ] Returns TwiML response to Twilio

**Worker code location:** `~/.claude/tools/cloudflare-workers/capture-webhook/`

### Phase 2D: Mac Pull Script (~1 hour)

Build script that:
1. [ ] Connects to R2 using API credentials
2. [ ] Downloads new JSONL entries since last pull
3. [ ] Writes each message to `~/Inbox/raw/YYYY-MM-DD/`
4. [ ] CaptureIngest processes as normal

**Script location:** `~/.claude/tools/CapturePull.ts`

**Commands:**
```bash
# Pull new messages from cloud
capture pull

# Or add to capture status
capture status  # Shows: "5 messages in cloud queue"
```

### Phase 2E: Connect Twilio to Worker (~15 min)

1. [ ] Deploy worker to Cloudflare
2. [ ] Get worker URL: `https://capture-webhook.YOUR_SUBDOMAIN.workers.dev`
3. [ ] Configure Twilio SMS webhook → worker URL
4. [ ] Configure Twilio WhatsApp webhook → worker URL
5. [ ] Test end-to-end: text → captured

**Verification:** Send SMS → appears in R2 → pull → appears in `capture status`

---

## Phase 2 Success Criteria

- [ ] Can text thoughts to capture number anytime (24/7)
- [ ] Messages captured even when Mac is off
- [ ] Prefix parsing auto-tags correctly
- [ ] `capture pull` syncs cloud → local
- [ ] `capture status` shows cloud queue count

---

## Future Phases (After Phase 2)

### Phase 3: Voice Memo Transcribe
- Whisper integration for dropped audio files
- Auto-transcribe → store as text

### Phase 4: ChatGPT Export Parser
- Parse ChatGPT voice capture exports
- Separate USER statements (source truth) from GPT responses
- Enable re-processing with Claude

### Phase 5: Email Forward Capture
- Cloudflare Email Workers
- Forward to capture@yourdomain.com → R2

### Phase 6: Family Meal Planning UI
- Cloudflare Pages for family-visible interface
- Meal plans, shopping lists, recipe cards
- Comms channel automation for coordination

---

## Cloudflare Account Structure (Target)

```
CLOUDFLARE ACCOUNT
├── R2 Buckets
│   ├── pai-capture        # SMS/WhatsApp messages
│   │   └── inbox/YYYY-MM-DD.jsonl
│   └── pai-backups        # Neo4j dumps, etc.
│       └── neo4j/YYYY-MM-DD.dump
│
├── Workers
│   └── capture-webhook    # Twilio → R2
│
└── Pages (future)
    └── family-meals       # Meal planning UI
```

---

## Key Insight: ChatGPT Voice as Primary Modality

Your main verbal capture flow is ChatGPT voice. Exports contain TWO streams:
- **USER statements** — Your raw thinking (source truth, reprocessable)
- **GPT responses** — Already structured (valuable but secondary)

Architecture handles this: separate streams on parse, tag USER as `source:primary`.

---

## Commands Reference

```bash
# Local capture (Phase 1 - working now)
capture status          # Show inbox status
capture process         # Process dropped files
capture watch           # Watch drop folder

# Cloud capture (Phase 2 - to build)
capture pull            # Pull from R2 to local
capture push            # (future) Push local to R2

# Drop folder
~/Inbox/drop/           # Drop files here
```

---

## Files Reference

| File | Purpose |
|------|---------|
| `~/.claude/MEMORY/pai-backlog/2026-01-17-infra-universal-capture-system.md` | Full architecture spec |
| `~/.claude/tools/CaptureIngest.ts` | Local file watcher + processor |
| `~/.claude/bin/capture` | Convenience launcher |
| `~/.claude/tools/CapturePull.ts` | (to build) R2 → local sync |
| `~/.claude/tools/cloudflare-workers/capture-webhook/` | (to build) Twilio webhook |

---

## To Resume

Say any of:
- "Continue capture system"
- "Let's build Phase 2A - Cloudflare setup"
- "Set up Twilio for capture"
- "Build the capture webhook"

---

## Session Context

**2026-01-17 Session:**
- Designed Universal Capture architecture
- Built Phase 1 (local drop folder capture)
- Decided Cloudflare for cloud infrastructure
- Meal planning UI identified as future Cloudflare Pages use
- Comm channel key to meal planning coordination
