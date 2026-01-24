---
capture_type: LEARNING
timestamp: 2026-01-22 15:15:49 PST
auto_captured: true
tags: [auto-capture]
---

# Quick Learning: PAI has 8 systems for project tracking. Missing piece: cross-domain "Now" layer for priorities.

**Date:** 2026-01-22
**Auto-captured:** Yes (use /capture-learning for detailed narrative)

---

## Summary

Comprehensive survey of PAI's task/project management capabilities reveals 8 coordinated systems with strong foundations, but key gaps in cross-domain visibility and context-switch management.

## Analysis

**What PAI Already Has (Strong Foundation):**

## Actions Taken

Surveyed TELOS skill, MEMORY system, continuations, WORK directory, THEALGORITHM, and hook infrastructure.

## Results

Identified a simple, expandable approach for cross-domain coordination.

## Current Status

Ready to implement Phase 1

## Next Steps

1. Create `projects.json` schema and seed from existing continuations

---

## Notes

This is an automatically captured learning moment. For a more detailed narrative with:
- The full problem-solving journey
- What we initially thought vs. what was true
- Detailed troubleshooting steps
- Comprehensive lesson learned

Use: `/capture-learning` to create a full learning document.

---

## Full Response

<details>
<summary>Click to view full response</summary>

📋 SUMMARY: Comprehensive survey of PAI's task/project management capabilities reveals 8 coordinated systems with strong foundations, but key gaps in cross-domain visibility and context-switch management.

🔍 ANALYSIS: 

**What PAI Already Has (Strong Foundation):**

| System | What It Does | ADHD-Friendly? |
|--------|--------------|----------------|
| **TELOS** | Life OS + Project analysis across 18 files | ✅ Auto-discovers, no taxonomy needed |
| **Continuations** | 16 active projects tracked across sessions | ✅ "Start here" entry points |
| **MEMORY** | 3-tier archive (hot/warm/cold) + signals | ✅ Automatic capture |
| **THEALGORITHM** | Structured execution with ISC tracking | ✅ Phases prevent paralysis |
| **TodoWrite** | In-session task tracking | ✅ Visible progress |
| **Hooks** | Auto-inject context at session start | ✅ Zero setup each time |

**The Gap (Why It Feels Hard):**

You have 16 continuations in separate files, 92 work directories, and multiple domains—but **no single place to see "what matters now" across all of them**.

The ADHD tax: You have to manually check files to understand priority, energy doesn't inform routing, and context-switching has no guidance.

⚡ ACTIONS: Surveyed TELOS skill, MEMORY system, continuations, WORK directory, THEALGORITHM, and hook infrastructure.

✅ RESULTS: Identified a simple, expandable approach for cross-domain coordination.

---

## 🎯 Recommended Approach: **The "Now" Layer**

**Philosophy:** One command, one answer: "What should I work on NOW?"

### Phase 1: The Quick Win (Build Today)

Create a simple `pai now` command that:

```
┌─────────────────────────────────────────────────────┐
│  🧠 PAI PROJECT STATUS                              │
├─────────────────────────────────────────────────────┤
│  Energy: [  ] Low  [X] Medium  [  ] High            │
├─────────────────────────────────────────────────────┤
│  🔥 SUGGESTED NOW (matches your energy):            │
│     → xConnect Sprint 8 - Define schema changes     │
├─────────────────────────────────────────────────────┤
│  📋 ALL ACTIVE (16 projects):                       │
│     ● xConnect IDE .............. Sprint 8 Ready    │
│     ○ Graphiti Temporal KG ...... Implementation    │
│     ○ Neo4j PAA Integration ..... Phase 2L' + 3     │
│     ○ Omni Capture .............. Phase 2 Ready     │
│     [+12 more - type `pai projects` to see all]     │
├─────────────────────────────────────────────────────┤
│  🚧 BLOCKERS:                                       │
│     None detected                                   │
├─────────────────────────────────────────────────────┤
│  💡 TIP: You've been on xConnect 4 sessions.        │
│     Consider: Context-switch to Graphiti?           │
└─────────────────────────────────────────────────────┘
```

### Phase 2: Energy-Based Routing

| Energy Level | Task Types Surfaced |
|--------------|---------------------|
| **Low** | Quick wins, documentation, reviews |
| **Medium** | Standard implementation, debugging |
| **High** | Complex architecture, DETERMINED work |

### Phase 3: Cross-Domain Dependencies

```
xConnect → blocks → Omni Capture (needs auth)
Graphiti → enables → Second Brain search
```

### Phase 4: Context-Switch Intelligence

- Track switches via hook
- Detect patterns: "You switch every 15 min when tired"
- Protect hyperfocus: "You're 90 min deep—stay or switch?"

---

## 🛠️ Simple Implementation Path

**Step 1** - Aggregate continuations into `MEMORY/projects.json`:
```json
{
  "projects": [
    {"name": "xConnect", "status": "Sprint 8 Ready", "priority": "P1", "lastTouch": "2026-01-22"},
    {"name": "Graphiti", "status": "Implementation Ready", "priority": "P2", "lastTouch": "2026-01-21"}
  ]
}
```

**Step 2** - Create `pai now` CLI that reads this + asks energy level

**Step 3** - Add hook to update `projects.json` when continuations change

**Step 4** - (Later) Add cross-project dependency tracking

---

## 📊 STATUS: Ready to implement Phase 1

📁 CAPTURE: Survey complete. PAI has strong per-project tracking but lacks cross-domain visibility. "Now" layer is the missing piece.

➡️ NEXT: 
1. Create `projects.json` schema and seed from existing continuations
2. Build `pai now` CLI command
3. Add SessionStart hook to show "Now" summary

📖 STORY EXPLANATION:
1. PAI already tracks 16 projects via continuations and 92 work directories
2. TELOS provides life context; THEALGORITHM provides execution structure
3. The gap is cross-domain visibility—no "what now?" across all projects
4. ADHD needs: minimal decisions, energy-aware routing, context-switch guidance
5. Solution: The "Now" layer—one command that answers "what should I work on?"
6. Phase 1 is simple: aggregate continuations + show priorities + match energy
7. System expands naturally: add dependencies, pattern detection, hyperfocus protection
8. Foundation exists; we just need the orchestration layer on top

⭐ RATE (1-10): 

🗣️ NeonBrain: PAI has 8 systems for project tracking. Missing piece: cross-domain "Now" layer for priorities.

</details>
