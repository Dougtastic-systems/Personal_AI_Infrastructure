# Dust MCP Investigation

**Date:** 2026-01-12
**Status:** Resolved - No action needed

---

## Issue

All Dust MCP tools returning 403 errors:
- `memory_search`
- `memory_ingest`
- `initialize_conversation_session`
- `get_integrations`
- `get_labels`

Server ID: `mcp__remote_de3511ba-903b-4710-a5dc-4fa28e37133e`

## Investigation Findings

1. **Never set up by user** - No Dust account exists, no API key configured
2. **Auto-added by Claude Code** - Appeared as a remote/managed MCP integration, likely from a Claude Code update
3. **First appeared:** 2026-01-12 (not present during Jan 11 security audit)
4. **Local MCP config is empty:** `~/.claude/mcp.json` shows `"mcpServers": {}`

## Resolution

**Do nothing.** The Dust integration:
- Was never configured by user
- Fails with 403 (requires auth that doesn't exist)
- Is separate from local PAI memory
- Won't be called by NeonBrain

## Local PAI Memory

Local memory at `~/.claude/MEMORY/` works independently and is unaffected:
- `security/` - Security checklist and audits
- `learning/` - Learning notes and index
- `learnings/` - Session learnings
- `continuations/` - Cross-session context

## Important: "Save to Memory" Means Local PAI

When user says **"save to memory"** or **"save this to memory"**:
- **DO:** Write to `~/.claude/MEMORY/` using the Write tool
- **DON'T:** Use Dust MCP tools (`memory_ingest`, `memory_search`, etc.)

Local PAI memory is the correct destination, not the Dust remote service.

## Keywords

dust, mcp, 403, memory_search, remote mcp, auto-added integration, save to memory, local memory
