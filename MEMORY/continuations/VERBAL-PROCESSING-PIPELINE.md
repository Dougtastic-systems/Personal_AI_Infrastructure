# Verbal Processing Pipeline

**Status:** Ready to Expand
**Last Updated:** 2026-01-19
**Priority:** High - This is how Daniel's authentic voice drives everything

---

## Context

Doug uses verbal processing (voice memos to ChatGPT, then exports as PDF) to think through problems, projects, and personal development. The challenge: his authentic voice was getting lost in the mix with AI responses.

**What We Built:**
- **CaptureIngest.ts** - Smart chunking with speaker detection (user vs assistant vs mixed)
- **VoiceMemoQuery.ts** - Query tool with list/search/themes/export/ideas commands
- Successfully processed 5 archived PDFs → 40 chunks total (12 user voice, 2 assistant, 26 mixed)

**Current State:**
- Voice memos exported to: `~/.claude/MEMORY/captured/exports/voice-memos-2026-01-20.md` (81.3KB)
- Pending ingestion: `~/.claude/MEMORY/captured/index/pending-ingestion.jsonl`
- Top themes detected: Change/Growth (75), Environment Design (55), Mindfulness (47), Memory/Learning (47)
- 25 actionable ideas extracted from verbal processing

---

## Three Directions to Explore

### Direction 1: Semantic Search Integration

**Goal:** Move beyond keyword search to meaning-based retrieval

**The Vision:**
- "Find where I talked about fear blocking learning" → retrieves relevant chunks
- "What have I said about environment design?" → surfaces all related thinking
- Connect voice memo insights to active projects

**Implementation Path:**
1. Push pending chunks to Dot memory via MCP
2. Create semantic query interface in VoiceMemoQuery.ts
3. Add relevance scoring for retrieved chunks
4. Build "connect to project" command that links insights to TELOS projects

**Questions to Decide:**
- Use Dot memory directly or build vector store in PAI?
- How to handle versioning as thinking evolves?

---

### Direction 2: Insight Synthesis via Fabric

**Goal:** Extract actionable wisdom from voice processing

**The Vision:**
- Run Fabric's `extract_wisdom` on user voice chunks
- Generate "Doug's Principles" from recurring patterns
- Create summary documents that evolve over time

**Implementation Path:**
1. Create `VoiceMemoQuery.ts synthesize` command
2. Pipe user chunks through Fabric patterns:
   - `extract_wisdom` → Core insights and principles
   - `extract_ideas` → Actionable next steps
   - `summarize` → Compressed versions for quick reference
3. Store synthesized output in `~/.claude/MEMORY/captured/synthesized/`
4. Create rolling "What Doug Thinks About X" documents

**Output Examples:**
- `MINDFULNESS-PRINCIPLES.md` - Your framework for mindfulness practice
- `NEUROCHEMICAL-DESIGN.md` - Your environment design approach
- `CHANGE-FRAMEWORK.md` - Your theory of behavior change

---

### Direction 3: Theme Deep-Dives

**Goal:** Extract specific frameworks and models from your thinking

**The Vision:**
Your voice memos contain original frameworks that deserve extraction:
- Neurochemical environment design
- Fear vs. safety activation patterns
- The "cemented fear" paradox
- Tonic vs. phasic dopamine implications

**Implementation Path:**
1. Create `VoiceMemoQuery.ts framework <theme>` command
2. Extract all chunks related to a theme
3. Use inference to synthesize into a structured framework
4. Output as actionable model with:
   - Core principle
   - How it works
   - How to apply it
   - Examples from your voice

**Priority Themes to Extract:**
1. Neurochemical activation (dopamine, cortisol, oxytocin, serotonin, anandamide)
2. Environment design for behavior change
3. Fear/safety dynamics in learning
4. ADHD-specific strategies

---

## Bigger Picture: Verbal Processing as Primary Input

**The Ultimate Goal:**
Your verbal processing becomes the primary way you:
- Drive project direction (voice → project tasks)
- Capture evolving knowledge (voice → knowledge base)
- Process what's on your mind (voice → clarity)
- Shift attitudes and beliefs (voice → principle documents)

**Future Workflow:**
```
Voice Memo → ChatGPT (thinking partner)
    ↓
Export PDF → Drop to ~/Inbox/drop/
    ↓
CaptureIngest → Chunk + Tag Speaker
    ↓
VoiceMemoQuery → Search/Themes/Ideas/Synthesize
    ↓
Connect to:
  - TELOS projects
  - Knowledge base
  - Principle documents
  - Daily/weekly reviews
```

---

## Start Here

**Quick Wins (5 min each):**
1. Run `bun ~/.claude/tools/VoiceMemoQuery.ts search "environment"` - see what you've said
2. Run `bun ~/.claude/tools/VoiceMemoQuery.ts ideas` - review extracted ideas
3. Read the exported markdown: `~/.claude/MEMORY/captured/exports/voice-memos-2026-01-20.md`

**Next Session Options:**
1. "Build semantic search for voice memos" → Direction 1
2. "Synthesize my voice memos into principles" → Direction 2
3. "Extract my neurochemical framework" → Direction 3
4. "Connect voice insights to my projects" → Integration play

**Key Files:**
- `~/.claude/tools/CaptureIngest.ts` - Ingestion with speaker detection
- `~/.claude/tools/VoiceMemoQuery.ts` - Query interface
- `~/.claude/MEMORY/captured/exports/voice-memos-2026-01-20.md` - Exported voice
- `~/.claude/MEMORY/captured/index/pending-ingestion.jsonl` - All chunks

---

## Decision Points

1. **Semantic Search Backend:** Dot memory via MCP or custom vector store?
2. **Synthesis Frequency:** On-demand or rolling updates after each new memo?
3. **Integration Depth:** Shallow (search only) or deep (auto-link to TELOS)?
4. **Framework Priority:** Which theme to extract first?

---

*Your voice is the source. Everything else is amplification.*
