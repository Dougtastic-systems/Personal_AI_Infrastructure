# Install PAI Observability Dashboard

**Added:** 2026-01-13
**Category:** infra
**Priority:** medium
**Preconditions:** Have enough session history to make pattern analysis meaningful

## Context

Discussed whether to install observability now vs. later. Decided to defer because:
- Current need is planning/context addition, not tool-level visibility
- Observability captures mechanics (what tools fired), not intent (what you were trying to do)
- Memory system captures intent better than raw event streams
- No immediate use case that requires real-time agent monitoring

## The Idea

Install `pai-observability-server` pack which provides:
- Real-time dashboard showing all Claude Code tool executions
- Multi-agent swimlanes when running parallel agents
- JSONL event capture for historical analysis
- WebSocket streaming for live updates

Architecture: `Hook captures → JSONL file → Server watches → WebSocket → Vue dashboard`

## Expected Value

- **Debug multi-agent orchestration** - see what each spawned agent does
- **Verify hooks fire correctly** - essential for hook development
- **Performance tuning** - identify bottlenecks and loops
- **Audit trail** - complete record of all tool executions
- **Pattern extraction** - find automation candidates from repeated sequences

## When to Revisit

- When running multiple agents in parallel and needing to debug coordination
- When developing new hooks and needing to verify they fire
- After accumulating 20+ similar work sessions where pattern analysis would be valuable
- When building automation that needs to understand typical tool sequences
