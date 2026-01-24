# Omni Capture System - Master Architectural Plan

**Created:** 2026-01-19
**Status:** ACTIVE - Phase 2 Ready
**Philosophy:** Capture now, structure later. Zero friction ingest, on-demand processing.

---

## System Vision

```
                          OMNI CAPTURE ARCHITECTURE
═══════════════════════════════════════════════════════════════════════════

   CAPTURE SOURCES                    CLOUD LAYER                LOCAL LAYER
   ──────────────                    ───────────                ───────────

   ┌─────────────┐                 ┌─────────────┐
   │ SMS/WhatsApp│────Twilio──────►│ Cloudflare  │
   │   (24/7)    │                 │   Worker    │
   └─────────────┘                 └──────┬──────┘
                                          │
   ┌─────────────┐                        │
   │   Email     │────CF Email────────────┤
   │  Forward    │   Workers              │
   └─────────────┘                        │
                                          ▼
   ┌─────────────┐                 ┌─────────────┐         ┌─────────────┐
   │  ChatGPT    │                 │     R2      │         │   ~/Inbox   │
   │Voice Export │─────drop───────►│   Bucket    │◄─pull───│    drop/    │
   └─────────────┘        │        └──────┬──────┘         └──────┬──────┘
                          │               │                       │
   ┌─────────────┐        │               │                       │
   │ Voice Memo  │────────┼───────────────┼───────────────────────┤
   │   (m4a)     │        │               │                       │
   └─────────────┘        │               │                       │
                          │               │                       │
   ┌─────────────┐        │               │                       │
   │  Any File   │────────┘               │                       │
   │   (drop)    │                        │                       │
   └─────────────┘                        │                       │
                                          │                       │
                          ┌───────────────┴───────────────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │CaptureIngest│
                   │  (local)    │
                   └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐         ┌─────────────┐
                   │   MEMORY    │────────►│  Processing │
                   │captured/raw │         │  (on-demand)│
                   └─────────────┘         └─────────────┘

```

---

## Phase Summary

| Phase | Name | Dependencies | Deliverable | Status |
|-------|------|--------------|-------------|--------|
| **1** | Local Foundation | None | Drop file → captured | ✅ COMPLETE |
| **2A** | Cloudflare Setup | None | R2 buckets, API access | 🔲 READY |
| **2B** | Twilio Setup | None | Phone number provisioned | 🔲 READY |
| **2C** | Webhook Worker | 2A, 2B | SMS → R2 flow | 🔲 BLOCKED |
| **2D** | Mac Pull Script | 2A | R2 → local sync | 🔲 BLOCKED |
| **2E** | Integration | 2C, 2D | End-to-end SMS capture | 🔲 BLOCKED |
| **3** | Voice Transcription | 1 | Audio → text auto | 🔲 FUTURE |
| **4** | ChatGPT Parser | 1 | Dual-stream extraction | 🔲 FUTURE |
| **5** | Email Capture | 2A | Email → R2 → local | 🔲 FUTURE |
| **6** | Processing Pipeline | 1-5 | On-demand structuring | 🔲 FUTURE |

---

## Detailed Phase Breakdown

### Phase 1: Local Foundation ✅ COMPLETE

**What exists:**
- `~/Inbox/{drop,raw,archive}` folder structure
- `~/.claude/MEMORY/captured/{raw,processed,index}` storage
- `~/.claude/tools/CaptureIngest.ts` - FileWatcher + metadata
- `capture` CLI command (status, process, watch)

**How to use now:**
```bash
cp any-file.txt ~/Inbox/drop/   # Drop file
capture process                  # Process it
capture status                   # Check inbox
```

---

### Phase 2A: Cloudflare Foundation

**Goal:** Establish cloud infrastructure for 24/7 capture and future PAI services.

**Tasks:**
```
[ ] 1. Create Cloudflare account (cloudflare.com/sign-up)
[ ] 2. Enable R2 storage (Dashboard → R2)
[ ] 3. Create bucket: pai-capture
[ ] 4. Create bucket: pai-backups (future use)
[ ] 5. Generate API token:
       - Permissions: Workers R2 Storage (Edit)
       - Account Resources: Include your account
[ ] 6. Store credentials in ~/.claude/.env:
       CLOUDFLARE_ACCOUNT_ID=xxxxx
       CLOUDFLARE_R2_ACCESS_KEY_ID=xxxxx
       CLOUDFLARE_R2_SECRET_ACCESS_KEY=xxxxx
```

**Verification:**
```bash
# Test upload to R2 (after credentials configured)
bun ~/.claude/tools/R2Test.ts upload test.txt
bun ~/.claude/tools/R2Test.ts download test.txt
```

**Outputs:**
- R2 bucket `pai-capture` accessible
- R2 bucket `pai-backups` created
- API credentials stored securely
- Basic R2 test tool working

---

### Phase 2B: Twilio Setup

**Goal:** Provision SMS/WhatsApp number for capture.

**Tasks:**
```
[ ] 1. Create Twilio account (twilio.com/try-twilio)
[ ] 2. Complete verification (phone/email)
[ ] 3. Buy phone number (~$1.15/mo):
       - SMS capable
       - US number preferred
[ ] 4. Join WhatsApp Sandbox (optional, free):
       - Messaging → Try It Out → WhatsApp
[ ] 5. Note credentials:
       - Account SID
       - Auth Token
[ ] 6. Store in ~/.claude/.env:
       TWILIO_ACCOUNT_SID=xxxxx
       TWILIO_AUTH_TOKEN=xxxxx
       TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

**Verification:**
- Can see number in Twilio Console
- Send test SMS from Console → verify delivery

**Outputs:**
- Twilio phone number active
- Credentials stored
- Can send test messages from console

---

### Phase 2C: Cloudflare Worker Webhook

**Goal:** Build always-on endpoint that receives Twilio webhooks and stores to R2.

**Dependencies:** Phase 2A, Phase 2B

**Worker Design:**
```
Twilio POST → Worker → Validate → Parse → Store → TwiML Response

┌─────────────────────────────────────────────────────────────┐
│                    CAPTURE-WEBHOOK WORKER                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Receive POST from Twilio                                │
│     - X-Twilio-Signature header                             │
│     - Form body: From, Body, MediaUrl0, etc.                │
│                                                             │
│  2. Validate signature (security)                           │
│     - HMAC-SHA1 with Auth Token                             │
│     - Reject invalid requests                               │
│                                                             │
│  3. Parse message content                                   │
│     - Extract: From, Body, MediaUrls                        │
│     - Apply prefix parsing:                                 │
│       "Idea:" → tag: idea                                   │
│       "Todo:" → tag: task                                   │
│       "Note:" → tag: note                                   │
│       "Remind:" → tag: reminder                             │
│       "Q:" → tag: question                                  │
│       (none) → tag: quick-capture                           │
│                                                             │
│  4. Normalize to JSON schema                                │
│     {                                                       │
│       "id": "uuid",                                         │
│       "captured_at": "ISO timestamp",                       │
│       "source": "sms|whatsapp",                             │
│       "from": "+1234567890",                                │
│       "body": "message text",                               │
│       "auto_tags": ["idea"],                                │
│       "media_urls": []                                      │
│     }                                                       │
│                                                             │
│  5. Append to R2                                            │
│     - Path: pai-capture/inbox/YYYY-MM-DD.jsonl              │
│     - One JSON object per line                              │
│                                                             │
│  6. Return TwiML response                                   │
│     - Acknowledge receipt to Twilio                         │
│     - Optional: Reply with confirmation                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Tasks:**
```
[ ] 1. Initialize worker project:
       cd ~/.claude/tools
       mkdir -p cloudflare-workers/capture-webhook
       cd cloudflare-workers/capture-webhook
       wrangler init

[ ] 2. Configure wrangler.toml:
       - R2 bucket binding
       - Environment variables (encrypted)

[ ] 3. Implement worker (src/index.ts):
       - Twilio signature validation
       - Message parsing
       - Prefix tag detection
       - R2 append operation
       - TwiML response

[ ] 4. Local testing:
       wrangler dev
       curl -X POST localhost:8787 -d "From=+1234&Body=Idea: test"

[ ] 5. Deploy:
       wrangler deploy

[ ] 6. Note worker URL:
       https://capture-webhook.YOUR_SUBDOMAIN.workers.dev
```

**Outputs:**
- Worker deployed and accessible
- R2 writes working
- Ready for Twilio connection

---

### Phase 2D: Mac Pull Script

**Goal:** Sync messages from R2 to local capture system.

**Dependencies:** Phase 2A

**Script Design:**
```
~/.claude/tools/CapturePull.ts

┌─────────────────────────────────────────────────────────────┐
│                      CAPTURE PULL                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Read last pull marker                                   │
│     - ~/.claude/MEMORY/captured/index/last-pull.json        │
│     - Contains: { "lastFile": "2026-01-19.jsonl",           │
│                   "lastLine": 42 }                          │
│                                                             │
│  2. List R2 inbox files                                     │
│     - pai-capture/inbox/*.jsonl                             │
│     - Filter: newer than last pull                          │
│                                                             │
│  3. Download new entries                                    │
│     - Read JSONL files                                      │
│     - Skip already-processed lines                          │
│                                                             │
│  4. For each new message:                                   │
│     - Write to ~/Inbox/raw/YYYY-MM-DD/HHMMSS_sms_tag.md    │
│     - Generate metadata JSON                                │
│     - Copy to MEMORY/captured/raw/                          │
│     - Update unprocessed index                              │
│                                                             │
│  5. Update last pull marker                                 │
│                                                             │
│  6. Report summary                                          │
│     - "Pulled 5 new messages"                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Tasks:**
```
[ ] 1. Create CapturePull.ts:
       - R2 client setup (S3-compatible API)
       - Last-pull tracking
       - JSONL parsing
       - Integration with CaptureIngest

[ ] 2. Extend capture CLI:
       - capture pull → runs CapturePull.ts
       - capture status → shows "N messages in cloud queue"

[ ] 3. Test locally:
       - Manually add test JSONL to R2
       - Run capture pull
       - Verify files appear in local inbox
```

**Outputs:**
- `capture pull` command working
- `capture status` shows cloud queue
- R2 → local sync functional

---

### Phase 2E: Integration & Testing

**Goal:** Connect all Phase 2 components for end-to-end SMS capture.

**Dependencies:** Phase 2C, Phase 2D

**Tasks:**
```
[ ] 1. Configure Twilio webhooks:
       - Phone Numbers → Your Number → Messaging
       - "A MESSAGE COMES IN" → Webhook URL → Worker URL
       - HTTP POST method

[ ] 2. Configure WhatsApp (if using sandbox):
       - Messaging → Settings → WhatsApp Sandbox
       - "WHEN A MESSAGE COMES IN" → Worker URL

[ ] 3. End-to-end test:
       a. Text "Idea: Testing capture system" to Twilio number
       b. Check R2: new entry in inbox/YYYY-MM-DD.jsonl
       c. Run: capture pull
       d. Check: capture status shows new item
       e. Verify: file in ~/Inbox/raw/ with correct metadata

[ ] 4. Test prefix parsing:
       - "Todo: Buy groceries" → tag: task
       - "Q: What was that thing?" → tag: question
       - "Just a random thought" → tag: quick-capture

[ ] 5. Test 24/7 capture:
       - Close laptop
       - Send SMS
       - Wake laptop
       - Run capture pull
       - Verify message captured
```

**Success Criteria:**
- [x] Can text thoughts to capture number anytime (24/7)
- [x] Messages captured even when Mac is off
- [x] Prefix parsing auto-tags correctly
- [x] `capture pull` syncs cloud → local
- [x] `capture status` shows cloud queue count

---

### Phase 3: Voice Transcription (Future)

**Goal:** Auto-transcribe dropped audio files.

**Dependencies:** Phase 1

**Approach:**
- Whisper API (OpenAI) for quality
- Or local Whisper for cost savings
- FileWatcher detects audio → triggers transcription
- Stores text + reference to original

**Key Decisions Needed:**
- [ ] Whisper API vs local model
- [ ] Keep original audio or delete after transcription
- [ ] Handle long recordings (chunk or full)

---

### Phase 4: ChatGPT Export Parser (Future)

**Goal:** Parse ChatGPT voice capture exports, separate USER from GPT responses.

**Dependencies:** Phase 1

**This is your PRIMARY capture modality.** Critical design:
- Detect JSON/HTML export format
- Extract USER statements as `source:primary`
- Extract GPT responses as `source:gpt-structured`
- Enable re-processing USER statements with Claude later

**Key Decisions Needed:**
- [ ] CustomGPT to standardize export format?
- [ ] Auto-drop from ChatGPT (API/export)?
- [ ] Retention of GPT responses vs just USER?

---

### Phase 5: Email Capture (Future)

**Goal:** Forward emails to capture address → R2 → local.

**Dependencies:** Phase 2A

**Approach:**
- Cloudflare Email Workers
- Domain: yourdomain.com
- Address: capture@yourdomain.com
- Parse subject, body, attachments → R2

---

### Phase 6: Processing Pipeline (Future)

**Goal:** On-demand structuring at configurable fidelity levels.

**Dependencies:** Phases 1-5 stable

**Processing Levels:**
| Level | What | Output |
|-------|------|--------|
| raw | Ingest only | Metadata |
| skim | Title + 1-line | Quick summary |
| summary | 1-paragraph | Brief |
| full | MARK + EXTRACT | Tasks, insights |
| deep | Full + cross-ref | Linked to MEMORY |

---

## Work Sequence (Recommended Order)

```
TODAY/NEXT SESSION:
├── 2A: Cloudflare account + R2 buckets (30 min, you)
├── 2B: Twilio account + number (15 min, you)
│
FOLLOWING SESSION:
├── 2C: Build webhook worker (1-2 hrs, Claude + you)
├── 2D: Build pull script (1 hr, Claude)
├── 2E: Integration testing (30 min, you)
│
THEN (as needed):
├── 3: Voice transcription
├── 4: ChatGPT parser (HIGH PRIORITY - primary modality)
├── 5: Email capture
└── 6: Processing pipeline
```

---

## Files Reference

| File | Purpose | Status |
|------|---------|--------|
| `~/.claude/tools/CaptureIngest.ts` | Local file watcher | ✅ Built |
| `~/.claude/bin/capture` | CLI launcher | ✅ Built |
| `~/.claude/tools/CapturePull.ts` | R2 → local sync | 🔲 To build |
| `~/.claude/tools/cloudflare-workers/capture-webhook/` | Twilio webhook | 🔲 To build |
| `~/.claude/tools/R2Test.ts` | R2 connectivity test | 🔲 To build |
| `~/Inbox/` | Capture entry point | ✅ Created |
| `~/.claude/MEMORY/captured/` | Structured storage | ✅ Created |

---

## Credentials Location

All stored in `~/.claude/.env`:
```
# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Whisper (Phase 3)
OPENAI_API_KEY=
```

---

## To Resume Work

Say any of:
- "Continue Omni Capture" → This plan
- "Start Phase 2A" → Cloudflare setup walkthrough
- "Start Phase 2B" → Twilio setup walkthrough
- "Build the webhook" → Phase 2C implementation
- "Build capture pull" → Phase 2D implementation
- "Test end-to-end" → Phase 2E integration

---

## Session Log

| Date | Work Done |
|------|-----------|
| 2026-01-17 | Phase 1 complete. Architecture designed. Cloudflare chosen as cloud layer. |
| 2026-01-19 | Master plan created with detailed phase breakdown and sequencing. |

