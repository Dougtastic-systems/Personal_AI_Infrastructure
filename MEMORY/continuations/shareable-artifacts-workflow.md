# Shareable Artifacts Workflow

**Created:** 2026-01-23
**Status:** Idea / Exploration
**Priority:** Medium - potential friction reducer for collaboration

---

## The Insight

When Claude renders HTML artifacts (animations, data visualizations, explainers, planning diagrams), these aren't just for personal understanding - they can be **communication tools** shared with collaborators to convey complex ideas with less friction than text or static images.

**Core Loop:**
```
Create artifact → Share link → Get reaction → Iterate → Re-share
```

## The Problem It Solves

- Complex subjects require "taking someone on a journey" to understand
- Text explanations lose nuance; static images can't show process/flow
- Interactive artifacts can show "oh, THAT'S where we're going"
- Current friction: no quick way to get artifact in front of collaborator

## Proposed Solution: CodePen Quick-Share

**Why CodePen:**
- No login required for anonymous pens
- Paste HTML → Save → Share URL (30 seconds)
- Works in WhatsApp, email, Slack, anywhere
- Recipient taps link, sees interactive content immediately
- Editable - can iterate and re-share same URL or new version

**Workflow:**
1. Claude creates HTML artifact during planning/explanation
2. User pastes into CodePen (or automated script does it)
3. Share link with collaborator
4. Get feedback, iterate
5. Archive or delete when done

## Questions to Resolve

1. **Automation level:** Should PAI have a `/share` command that auto-publishes to CodePen via API?
2. **Persistence:** Do we want artifacts to persist (Cloudflare Pages) or be ephemeral (CodePen)?
3. **Versioning:** How to track iterations of a shared artifact?
4. **Privacy:** CodePen free tier is public - acceptable for most planning artifacts?
5. **Archive:** Where do "successful" artifacts go after use? Examples library?
6. **Templates:** Should we build artifact templates for common patterns (timelines, flowcharts, decision trees)?

## Use Cases

| Use Case | Artifact Type | Collaboration Goal |
|----------|---------------|-------------------|
| Strategy planning | Animated flowchart | Align on direction |
| System architecture | Interactive diagram | Get buy-in on design |
| Data analysis | Visualization | Share insights |
| Process explanation | Step-by-step animation | Train/onboard |
| Decision framework | Interactive tree | Facilitate choice |

## Related Concepts

- **Art skill** - already creates visual content, could extend to shareable artifacts
- **Browser skill** - could screenshot/validate shared artifacts
- **Observability** - could track which artifacts get engagement

## Implementation Options

### Minimal (Now)
- Manual CodePen workflow documented
- User copies HTML, pastes, shares

### Medium (Enhancement)
- `/share` command that takes HTML and returns CodePen URL
- Uses CodePen API (requires free account setup)

### Full (Feature)
- Dedicated artifact hosting on user's domain
- Version history, analytics, collaboration features
- Part of a broader "PAI Artifacts" system

## Bullet Summary

- HTML artifacts can be communication tools, not just personal understanding aids
- CodePen is the fastest path: paste, save, share link (30 seconds, no login)
- Reduces friction for sharing complex ideas with collaborators
- Works in WhatsApp, email, Slack - recipient just taps link
- Supports iteration: create → share → feedback → refine → re-share
- Questions remain: automation level, persistence, privacy, archiving
- Could become a `/share` command or full "PAI Artifacts" feature

## Next Steps When Resumed

1. Test the manual CodePen workflow with a real artifact
2. Evaluate if friction is low enough or if automation is needed
3. Decide on persistence model (ephemeral vs. permanent)
4. If valuable, spec out the `/share` command enhancement

---

**To continue this work:** "Continue shareable artifacts" or "Pick up the artifact sharing workflow"
