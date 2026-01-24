# PAI Development Backlog

Future work on **PAI itself** - infrastructure, design, and process improvements for the Personal AI Infrastructure project.

**Scope:** Only PAI tooling and buildout. Not general project backlogs or other work.

## How to Use

**Adding items:** Create a markdown file with the pattern `YYYY-MM-DD-short-name.md`

**Categories (use as prefix in filename or tag in frontmatter):**
- `infra-` Infrastructure changes (observability, hooks, tooling)
- `design-` Design/architecture decisions
- `process-` Workflow and process improvements
- `feature-` New capabilities to build

**When to pick up items:**
- When you have slack time between priority work
- When a related task makes the backlog item easier
- When the preconditions mentioned in the item are met

## Item Template

```markdown
# [Title]

**Added:** YYYY-MM-DD
**Category:** infra | design | process | feature
**Priority:** low | medium | high
**Preconditions:** What needs to be true before this makes sense

## Context

Why we discussed this, what triggered the idea.

## The Idea

What we would do.

## Expected Value

Why it matters, what it unlocks.

## When to Revisit

Triggers that indicate it's time to pick this up.
```

## Current Items

| Date | Category | Priority | Item |
|------|----------|----------|------|
| 2026-01-17 | infra | **HIGH** | [Universal Capture System](2026-01-17-infra-universal-capture-system.md) - Multi-path ingest (drop, SMS, voice, email, AI chat) → unified processing **[ACTIVE]** |
| 2026-01-14 | infra | high | [Transcript Pipeline](2026-01-14-infra-transcript-pipeline.md) - Audio → structured knowledge (Whisper + CLEAN→MARK→EXTRACT) — *subsumed by Universal Capture P2* |
| 2026-01-14 | infra | low | [Dual-Channel Messaging](2026-01-14-infra-dual-channel-messaging.md) - WhatsApp capture + SMS signal channels — *subsumed by Universal Capture P1* |
| 2026-01-14 | infra | medium | [CoworkBridge Architecture](2026-01-14-infra-cowork-bridge-architecture.md) - PAI + Claude Cowork integration |
| 2026-01-13 | infra | medium | [Observability Dashboard](2026-01-13-infra-observability-dashboard.md) - Real-time tool execution monitoring |
| 2026-01-13 | feature | medium | [Persistent Memory Projects](2026-01-13-feature-persistent-memory-projects.md) - Cross-session active project tracking

---

## To Consider

Ideas that haven't been fully explored yet. When one of these gains traction, promote it to a full backlog item.

| Idea | Notes |
|------|-------|
| **Daily Brief System** | Periodic briefing - what's next, what to focus on, surfaced priorities |
| **Transcript Pipeline** | Audio transcription (Whisper), meeting processing, CLEAN→MARK→VALIDATE, structured storage. **HIGH PRIORITY** - manual backlog |
| **Brainstorm Ingestion** | Capture brainstorms + voice notes, parse, store to MEMORY, make reusable. **TOP PRIORITY** - best thinking happens outside the loop, never gets in. More urgent than transcript backlog. |
| **Oura Ring Integration** | Health/sleep data dashboard, API integration, visibility into biometrics |
| **Personal Finance System** | Consolidate + automate finances, visibility dashboard, replace broken manual system. **HIGH PRIORITY** |
| **Gerri Rescoff Care Project** | Elderly/hospice care management - tasks, criteria, phase preparation, next steps tracking |
| **Project/Task/Calendar Module** | Unified time + work management. Schedule, track, document work. Master source TBD - need Outlook + Google integration or proxy for master calendar. |
| **Nate B. Jones Knowledge Project** | Ingest Substack articles, prompt frameworks, YouTube transcripts. Analyze, learn, develop AI strategy deck. Implement his ideas in PAI context. |
| **Chat History Ingestion** | Download + parse chats from ChatGPT, Claude Chat, Perplexity. Extract knowledge, themes, evolution of thinking. Discover patterns, update canonical frameworks, orient on what's next. |
| **Digital Photo Asset Management** | Consolidate, dedupe, categorize photos across multiple storage locations. Searchable library, backup process (local + cloud). Migrate from Lightroom/Photoshop to Affinity. Handle originals vs edits. |
| **Melissa Podcast Backlog** | Process Zoom meeting archive for podcast content. Identify interview nuggets, catalog for video editing, extract juicy moments. |
| **Graph Memory / Knowledge Graph** | Neo4j + Graphiti for temporal knowledge graphs. Capture strategic planning, metacognition, concept relationships. Queryable idea network with time dimension. |
| **Work Packet System** | Pre-staged work bundles: what it is, assets ready, why it matters, context from last session. Zero cognitive switching cost. No blank slates - jump right in. Depends on: Project/Task/Calendar Module. |
| **PAI Upgrade Automation** | Near-automated review + upgrade process for PAI releases. Watch Daniel Meisler's repo, diff changes, apply upgrades, verify. Build on Friday's manual upgrade session. |
| **PAI Evolution Journal** | Capture changes, growth, configuration over time. Shareable brief for other builders. Track what you've tried, what improved, continuous improvement story. Measure change effectiveness. |
| **Xactly Connect Tool Buildout** | Deliberate enhancement of XactlyConnect skill. History/changelog tracking, visual diagrams, work summaries. Generate reports for: self (what happened), boss (summary), senior leadership (how work gets done + AI tooling story). |
| **HeyPresto Integration** | Connect to HeyPresto API (Nate B. Jones meta-prompt tool). Use for prompt generation, task-specific prompt fleshing. Integrate with Prompting skill. Have subscription - just needs API hookup. |
| **Food/Meal Planning System** | Comprehensive food supplies, food prep, meal planning. Optimize and systematize - high energy drain currently. Inventory, recipes, shopping lists, prep scheduling. |

---

## Recommended (Based on Architecture)

Items I'd suggest based on PAI's current architecture and gaps:

| Idea | Rationale |
|------|-----------|
| **SessionStart Context Tuning** | Current hook loads full CORE context. Could optimize what loads based on working directory or project type. Reduces noise, faster startup. |
| **Signal Pattern Analysis** | MEMORY/Signals/ captures failures, loopbacks, patterns - but no automated analysis. Weekly digest of what's going wrong, what's improving. |
| **Pipeline Library** | PIPELINES.md defines the pattern but few concrete pipelines exist. Build out: Transcript Pipeline, Blog Publish, Meeting Prep. |
| **Work Item Templates** | MEMORY/Work/ structure is defined but no quick-start templates. Common patterns: Research, Implementation, Debug, Review. |
| **Stop Hook Enhancement** | Session summary capture exists but could extract more: learnings to phase folders, decision logging, open loop tracking. |
| **Calendar/Schedule Integration** | Daily Brief needs data. Connect to calendar for "what's coming" awareness. Pairs with Cowork connectors. |
| **Contact Enrichment** | CONTACTS.md exists but likely sparse. Enrich with context: last interaction, communication preferences, project associations. |
| **Inbox Unification** | Multiple capture sources (WhatsApp, email, Cowork, voice) all need unified inbox pattern. Design once, use everywhere. |
