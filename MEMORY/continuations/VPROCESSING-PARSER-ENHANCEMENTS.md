# Continuation: VProcessing Parser Enhancements

**Created:** 2026-01-19
**Status:** Active
**Context:** Built v1 of VProcessingParser.ts — working but needs refinement

---

## What Was Built

- `~/.claude/tools/VProcessingParser.ts` — Parses VProcessing GPT PDF exports
- `~/.claude/tools/CaptureIngest.ts` — Drop folder watcher for any file ingestion
- `~/.claude/MEMORY/captured/templates/VERBAL-PROCESSING-GPT-INSTRUCTIONS.md` — Custom GPT instructions

## Current State

Parser successfully:
- Extracts text via poppler/pdftotext
- Parses session start/end blocks with metadata
- Detects mode switches
- Separates Doug vs GPT responses (heuristic-based)
- Outputs structured markdown to `MEMORY/captured/processed/verbal/[date]/[session-id].md`

## Known Issues & Enhancement Opportunities

### 1. Speaker Detection Improvements
**Priority: High**
Current heuristics for separating Doug vs GPT are pattern-based and imperfect. Consider:
- Using ChatGPT export HTML instead of PDF (cleaner structure)
- Training patterns on more examples
- Adding manual review/correction workflow

### 2. Bullet Point Cleanup
**Priority: Medium**
Summary/action items show double bullets (`- •`). Need to clean regex.

### 3. Truncated Text in Summary
**Priority: Medium**
Long lines get cut off (`Strategi...`, `opera...`). PDF layout extraction issue.

### 4. Retroactive File Ingestion
**Priority: High**
Need clear workflow for:
- Ingesting files from before the system existed
- Backdating captured files to their actual session date
- Manual metadata override

### 5. Integration with CaptureIngest
**Priority: Medium**
Auto-detect VProcessing PDFs in drop folder and route to parser automatically.

### 6. Index File Generation
**Priority: Low**
Generate `MEMORY/captured/processed/verbal/INDEX.md` listing all parsed sessions.

### 7. Re-processing Support
**Priority: Low**
Flag to re-parse already processed files, or detect changes.

## Files to Review

```
~/.claude/tools/VProcessingParser.ts
~/.claude/tools/CaptureIngest.ts
~/.claude/MEMORY/captured/templates/VERBAL-PROCESSING-GPT-INSTRUCTIONS.md
~/.claude/MEMORY/captured/processed/verbal/2026-01-19/20260119-1542-brainstorm.md
```

## Resume Prompt

"Continue work on VProcessing parser enhancements. Read the continuation at `~/.claude/MEMORY/continuations/VPROCESSING-PARSER-ENHANCEMENTS.md` and pick up where we left off. Priority is [speaker detection / bullet cleanup / retroactive ingestion / your choice]."

---

## Related

- Universal Capture System architecture: `~/.claude/MEMORY/pai-backlog/2026-01-17-infra-universal-capture-system.md`
- VProcessing Custom GPT instructions: `~/.claude/MEMORY/captured/templates/VERBAL-PROCESSING-GPT-INSTRUCTIONS.md`
