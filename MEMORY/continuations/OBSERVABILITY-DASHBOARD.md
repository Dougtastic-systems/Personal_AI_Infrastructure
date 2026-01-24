# Continuation: PAI Observability Dashboard

**Created:** 2026-01-22
**Status:** ACTIVE - Running and Working
**Location:** `~/.claude/Observability/`

---

## Quick Start

```bash
# Start the dashboard
~/.claude/Observability/manage.sh start-detached

# Open in browser
open http://localhost:5172

# Stop when done
~/.claude/Observability/manage.sh stop

# Check status
~/.claude/Observability/manage.sh status
```

---

## What It Does

Real-time visualization of Claude Code activity across all sessions and agents:

- **Live Pulse Chart** - Event frequency and system heat level
- **Event Timeline** - Scrolling log of all tool executions
- **Agent Swimlanes** - Compare parallel agents side-by-side
- **Toast Notifications** - Alerts when new agents spawn
- **Theme Manager** - Customizable Tokyo Night styling

---

## Architecture

```
~/.claude/projects/     → Server watches JSONL session files
        ↓
Server (port 4000)      → Parses events, WebSocket streaming
        ↓
Client (port 5172)      → Vue.js dashboard with real-time updates
```

**Key Files:**
- `apps/server/src/file-ingest.ts` - Watches projects directory
- `apps/server/src/index.ts` - Bun HTTP + WebSocket server
- `apps/client/src/App.vue` - Main dashboard component
- `manage.sh` - Start/stop/restart management script

---

## How to Use

### Basic Monitoring
1. Start dashboard: `manage.sh start-detached`
2. Open http://localhost:5172
3. Work normally in Claude Code - events appear in real-time
4. Stop when done: `manage.sh stop`

### Multi-Agent Visualization
1. Click an agent tag in the timeline to add a swimlane
2. Spawn parallel agents with Task tool
3. Each agent gets a unique color
4. Compare activity patterns side-by-side

### Filtering
- Click filter icon to show/hide filter panel
- Filter by: source app, session ID, event type
- Time ranges: 1M, 2M, 4M, 8M, 16M minutes

---

## Troubleshooting

### "Connection refused" on port 5172
```bash
# Install dependencies if missing
cd ~/.claude/Observability/apps/client && bun install
cd ~/.claude/Observability/apps/server && bun install

# Restart
~/.claude/Observability/manage.sh restart
```

### No events appearing
- Check server is watching correct directory
- Server watches: `~/.claude/projects/-Users-{USER}/`
- Verify with: `curl http://localhost:4000/events/recent`

### Ports already in use
```bash
~/.claude/Observability/manage.sh stop
# If still stuck:
lsof -ti :4000 :5172 | xargs kill -9
```

---

## Session Fix Applied (2026-01-22)

Fixed `file-ingest.ts` line 37 to watch correct projects directory:
- **Before:** `-Users-{USER}--claude` (wrong)
- **After:** `-Users-{USER}` (correct)

---

## To Resume Work

Say:
- **"Start observability"** → Run manage.sh start-detached
- **"Continue observability"** → Load this context
- **"Improve observability"** → Add features to dashboard
