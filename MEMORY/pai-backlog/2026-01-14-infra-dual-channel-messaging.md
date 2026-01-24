# Dual-Channel Messaging: Calm Capture + High-Signal Coordination

**Added:** 2026-01-14
**Category:** infra
**Priority:** low
**Preconditions:** None - can implement anytime; pilot-friendly with low cost

---

## Context

### The Problem

Modern messaging creates constant interruption. Every channel demands attention equally, whether it's a fleeting thought worth capturing or a time-sensitive coordination message from family.

**Current state:** No structured way to:
- Capture thoughts, photos, handwritten notes, forwards without friction
- Distinguish "process later" from "see now"
- Route inbound messages to Claude for task/note extraction

**Desired state:** Two distinct channels with different attention profiles, unified backend for Claude processing.

### The Insight (Durable)

Separate **capture** from **signal**:

| Intent | Behavior | Example |
|--------|----------|---------|
| **Capture** | Muted, never checked in moment, processed async | "Remind me to...", photo of whiteboard, forwarded article |
| **Signal** | Unsilenced, must be seen, trust circle only | "Running 10 min late", "Kids need pickup", "Confirm dinner?" |

This is the core insight. The specific channels are implementation details.

---

## Current Approach: WhatsApp + SMS via Twilio

### Architecture

```
CAPTURE (WhatsApp - Muted)
├── "Doug Capture" chat in contacts
├── Send: text, photos, handwritten notes, screenshots, forwards
├── Never look at it in the moment
└── Webhook receives → inbox

SIGNAL (SMS - Unsilenced)
├── Family + small trust circle only
├── Time-sensitive coordination
├── OS-level notifications on
└── Same webhook → inbox (tagged differently)

UNIFIED BACKEND
├── Single webhook: /incoming
├── Normalizes both channels to JSON
├── Appends to inbox/messages.jsonl
└── Claude processes async → tasks, notes, briefs
```

### Why WhatsApp + SMS

| Factor | WhatsApp (Capture) | SMS (Signal) |
|--------|-------------------|--------------|
| **Friction** | Already installed, share menu integration | Universal, works with anyone |
| **Muting** | Per-chat mute, won't interrupt | Can't mute - that's the point |
| **Media** | Photos, docs, voice, forwards | MMS for images when needed |
| **Cost** | Conversation-based (~$0.005-0.08/convo) | Pay-per-message (~$0.0079/msg) |
| **Setup** | Sandbox now, Business API later | Single Twilio number |

### Data Model

```typescript
interface Message {
  ts: string;              // ISO timestamp
  channel: "whatsapp" | "sms";
  direction: "inbound" | "outbound";
  from: string;            // Phone number or contact_id
  to: string;
  body: string;
  media_urls: string[];    // Twilio-hosted media
  status: string;          // delivered, read, failed
  contact_id?: string;     // Resolved contact
  thread_id?: string;      // Conversation grouping
  tags?: string[];         // capture, signal, processed, etc.
}
```

### Webhook Implementation (Sketch)

```typescript
// POST /incoming - receives both WhatsApp and SMS from Twilio
app.post("/incoming", (req, res) => {
  const message = {
    ts: new Date().toISOString(),
    channel: req.body.From?.startsWith("whatsapp:") ? "whatsapp" : "sms",
    direction: "inbound",
    from: req.body.From?.replace("whatsapp:", ""),
    to: req.body.To?.replace("whatsapp:", ""),
    body: req.body.Body,
    media_urls: extractMediaUrls(req.body), // NumMedia, MediaUrl0, etc.
    status: "received"
  };

  appendToInbox(message);

  // Simple ack so Twilio is satisfied
  res.type("text/xml").send("<Response></Response>");
});
```

### Cost Estimate (Pilot)

| Component | Volume | Cost |
|-----------|--------|------|
| Twilio SMS number | 1 | ~$1.15/mo |
| WhatsApp sandbox | Free tier | $0 |
| SMS messages | ~50/mo | ~$0.40/mo |
| WhatsApp conversations | ~30/mo | ~$1-2/mo |
| **Total pilot** | | **~$3-5/mo** |

---

## Alternatives Considered

### Telegram (Strong Alternative)

| Pros | Cons |
|------|------|
| Free bot API, no approval needed | Another app to install |
| Excellent for capture (text, voice, files) | Less universal than SMS for signal |
| Webhook setup is trivial | Splitting ecosystems |
| Self-hosted bot option | |

**Verdict:** Strong candidate if WhatsApp friction becomes too high. Could replace WhatsApp for capture while keeping SMS for signal.

### Email (Capture Inbox)

| Pros | Cons |
|------|------|
| Already have infrastructure | Higher friction to send |
| Attachments work well | Not as quick as messaging |
| No external service needed | Feels "heavier" than capture should |

**Verdict:** Good for forwarding articles/docs, not ideal for quick capture.

### Voice Memo + Transcription

| Pros | Cons |
|------|------|
| Hands-free capture | Requires transcription step |
| Great while driving/walking | Whisper integration needed |
| Captures nuance you wouldn't type | Post-processing complexity |

**Verdict:** Complementary to messaging capture, not a replacement. Worth adding later.

### Apple Shortcuts + Notes

| Pros | Cons |
|------|------|
| Zero friction on iOS | Apple ecosystem only |
| Syncs via iCloud | No webhook/automation |
| No external service | Manual export to PAI |

**Verdict:** Good for personal capture, but doesn't enable Claude processing without manual steps.

### Signal

| Pros | Cons |
|------|------|
| Privacy-first | Very limited API |
| Already trusted | No official bot support |
| | Can't automate reliably |

**Verdict:** Not viable for automation; keep for human-to-human private comms.

---

## Processing Pipeline (Sketch)

```
INBOUND MESSAGE
     │
     ▼
inbox/messages.jsonl
     │
     ├──► [If media] Fetch from Twilio URL
     │         │
     │         ▼
     │    media/YYYY-MM-DD/{filename}
     │         │
     │         ├──► [If image] OCR / describe
     │         └──► [If PDF] Extract text
     │
     ▼
CLAUDE PROCESSING (batch or on-demand)
     │
     ├──► Extract tasks → task system
     ├──► Extract notes → MEMORY
     ├──► Generate briefs → daily summary
     └──► Flag urgent → notification system
```

### Processing Triggers

| Trigger | Behavior |
|---------|----------|
| **SessionStart hook** | Surface unprocessed message count |
| **On-demand** | "Process my capture inbox" |
| **Scheduled** | Daily batch at end of day |
| **Real-time** | Immediate processing (future, higher cost) |

---

## Integration Points with PAI

| System | Integration |
|--------|-------------|
| **MEMORY** | Processed notes/insights archived to `MEMORY/History/capture/` |
| **Notifications** | High-priority SMS could trigger desktop notification |
| **Pipelines** | Message processing as a defined pipeline |
| **Contacts** | `contact_id` resolution against `CONTACTS.md` |
| **SessionStart** | Hook surfaces "X unprocessed captures since last session" |

---

## Trust Circle Definition

**SMS Signal Channel - Who Gets Access:**

| Tier | Who | Purpose |
|------|-----|---------|
| **Tier 1** | Immediate family | Anything time-sensitive |
| **Tier 2** | Close collaborators (e.g., Rick) | Meeting coordination |
| **Tier 3** | Emergency contacts | True emergencies only |

**Management:** Maintain list in `CONTACTS.md` with `sms_signal: true` flag. Adding/removing requires explicit decision.

---

## Privacy & Security Considerations

| Concern | Mitigation |
|---------|------------|
| **Message storage** | Local `messages.jsonl`, not cloud-synced |
| **Media files** | Fetched from Twilio, stored locally, Twilio URLs expire |
| **Retention** | Define retention policy (e.g., 90 days raw, indefinite for processed) |
| **Access** | Only PAI/Claude processes; no external access |
| **Twilio security** | Webhook validation via signature |

---

## Failure Modes

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Webhook down | Twilio retry queue; monitor for gaps | Check Twilio console for failed deliveries |
| Twilio outage | No messages arriving | Wait; check status.twilio.com |
| Media fetch fails | Missing files in `media/` | Re-fetch from Twilio (URLs valid ~24h) |
| Processing error | Unprocessed count growing | Manual review; fix processing logic |

---

## Success Criteria

**Pilot is working when:**
- [ ] Can send WhatsApp message to capture number and see it in `messages.jsonl`
- [ ] Can send SMS to signal number and see it in `messages.jsonl`
- [ ] Media attachments (photos) are fetched and stored
- [ ] Channel tagging (`whatsapp` vs `sms`) works correctly
- [ ] PAI SessionStart hook surfaces unprocessed count

**Processing is working when:**
- [ ] Claude can read inbox and extract actionable tasks
- [ ] Handwritten note photos get OCR'd to text
- [ ] Processed messages are archived to MEMORY
- [ ] Daily brief includes capture summary

**Calm channel intent is achieved when:**
- [ ] WhatsApp capture chat stays muted; you never feel compelled to check it
- [ ] SMS signal channel remains high-signal; no noise creep
- [ ] You actually use capture channel for fleeting thoughts
- [ ] Processing lag is acceptable (same-day is fine)

---

## Migration Path

| Scenario | Path |
|----------|------|
| **Outgrow WhatsApp sandbox** | Apply for WhatsApp Business API; same webhook, different sender config |
| **Switch capture to Telegram** | Add Telegram bot webhook; both channels feed same `messages.jsonl` |
| **Add voice capture** | Whisper transcription → same inbox format with `channel: "voice"` |
| **Scale SMS** | Multiple Twilio numbers or short code; routing logic in webhook |
| **Self-host** | Matrix/Element with bridges; more control, more maintenance |

---

## Implementation Phases (When Ready)

### Phase 1: Minimal Pilot
1. Get Twilio account, provision SMS number
2. Join WhatsApp sandbox
3. Create basic webhook (Bun + Hono or similar)
4. Log to `messages.jsonl`
5. Manual Claude processing

### Phase 2: Media Handling
1. Fetch and store media attachments
2. Basic OCR for images (Tesseract or cloud API)
3. PDF text extraction

### Phase 3: PAI Integration
1. SessionStart hook for unprocessed count
2. MEMORY archival for processed messages
3. Contact resolution

### Phase 4: Automation
1. Scheduled processing batch
2. Task extraction pipeline
3. Daily capture brief generation

---

## When to Revisit

- **Pick up when:** Have bandwidth for infrastructure work; want to reduce capture friction
- **Reconsider channel choice if:** WhatsApp Business API approval is painful; Telegram looks simpler
- **Expand scope when:** Pilot proves the calm channel concept works; ready for voice/email integration

---

## Related

- CoworkBridge architecture: `pai-backlog/2026-01-14-infra-cowork-bridge-architecture.md` (similar webhook + inbox pattern)
- MEMORY system: `skills/CORE/SYSTEM/MEMORYSYSTEM.md`
- Hook system: `skills/CORE/SYSTEM/THEHOOKSYSTEM.md`
- Notification system: `skills/CORE/SYSTEM/THENOTIFICATIONSYSTEM.md`
- Contacts: `skills/CORE/USER/CONTACTS.md`
