# Continuation: MasterMindIntel Pipeline

**Last worked:** 2026-01-11
**Status:** Parked for review

---

## Context

We built a 6-layer fabrication-proof pipeline for processing mastermind group recordings. The skill was renamed from `MeetingIntel` to `MasterMindIntel` to reflect its specific purpose.

**Core principle discovered:** Meaning happened live. Our job is CAPTURE, not ANALYZE. Individual emails should show WORDS AS SPOKEN, not LLM paraphrase.

---

## What's Done

1. **Pipeline scripts** in `/Users/DSnyder/.claude/skills/MasterMindIntel/`:
   - `qa-transcript.ts` - Layer 0: Source quality gate
   - `extract-claims.ts` - Layer 1: Deterministic extraction
   - `validate-claims.ts` - Layer 3: Source verification
   - `synthesize-summary.ts` - Layer 4: Build from validated
   - `audit-summary.ts` - Layer 5: Adversarial check
   - `render-facilitator-review.ts` - Combined review doc

2. **Processed sessions:**
   - 2025-12-30 ✅
   - 2025-12-31 ✅
   - 2026-01-06 ✅
   - 2026-01-07 ✅

3. **Memory docs created:**
   - `~/.claude/MEMORY/learnings/mastermind-philosophy.md` - Your manifesto on change detection
   - `~/.claude/MEMORY/learnings/garbled-impact-protocol.md` - How to handle ambiguous attribution

4. **Architecture diagram:** `~/Downloads/mastermind-pipeline-architecture.md`

---

## Outstanding Tasks

### HIGH PRIORITY

1. **Refactor individual email structure**
   - Current: Analysis-heavy (my paraphrase, "why it works")
   - Needed: Words-first (direct quotes only, no interpretation)
   - Test case: Jasmine 12-30 - her framework presentation deserves her actual words

2. **Individual email sections should include:**
   - Your Moment: Direct quotes (most profound things they said)
   - What Others Said About You: Peer quotes with attribution
   - Your Commitment: Their exact words
   - NO: "Why it works", "Your Direction", analysis

3. **Facilitator talk-time metric**
   - Track how much Rick/Melissa/Doug spoke vs participants
   - Purpose: Facilitator self-awareness
   - Add to facilitator review doc

### MEDIUM PRIORITY

4. **Generate architecture diagram**
   - Text version exists at `~/Downloads/mastermind-pipeline-architecture.md`
   - Visual Excalidraw version failed (API overloaded)
   - Retry with Art skill when available

5. **Garbled Impact Protocol integration**
   - Protocol documented but not yet coded into `qa-transcript.ts`
   - Should flag ambiguous quotes at high-impact moments

### FUTURE

6. **Create BrainstormIntel skill**
   - Different meeting type = different processing logic
   - Work sessions with Rick, collaboration meetings
   - Will reuse some infrastructure but different output format

---

## Key Files

```
/Users/DSnyder/.claude/skills/MasterMindIntel/
├── SKILL.md                     # Updated with new name/description
├── claims-schema.ts             # TypeScript types
├── qa-transcript.ts             # Layer 0
├── extract-claims.ts            # Layer 1
├── validate-claims.ts           # Layer 3
├── synthesize-summary.ts        # Layer 4
├── audit-summary.ts             # Layer 5
├── render-facilitator-review.ts # Review doc generator

/Users/DSnyder/Personal_AI_Infrastructure/Knowledge/Meetings/Mastermind/
├── speaker-mappings.json        # Device name → person
├── raw/{date}/                  # Source transcripts
└── pass2/claims/{date}/         # Pipeline outputs

/Users/DSnyder/.claude/MEMORY/learnings/
├── mastermind-philosophy.md     # Your manifesto
└── garbled-impact-protocol.md   # Attribution handling
```

---

## Questions to Resolve

1. Should facilitator talk-time be percentage or absolute minutes?
2. Individual emails: Include commitment witnesses or not? (You said "group not ready yet")
3. Garbled impact moments: Block pipeline or just flag for review?

---

## To Resume

```
Read this continuation prompt, then:

1. Review architecture diagram: ~/Downloads/mastermind-pipeline-architecture.md
2. Review mastermind philosophy: ~/.claude/MEMORY/learnings/mastermind-philosophy.md
3. Pick up task: Refactor individual email to be words-first
4. Test on: Jasmine 12-30 session
```
