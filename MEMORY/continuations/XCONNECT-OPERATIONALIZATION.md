# Continuation: xConnect - Xactly Connect Database Operationalization

**Created:** 2026-01-20
**Status:** PHASE 2 COMPLETE - Claude SELECT Access via MCP
**Location:** `~/.claude/WORK/xConnect/`

---

## Executive Summary

Operationalize Xactly Connect database work by building:
1. Schema snapshot system (version control for DB schema)
2. Claude SELECT access (MCP server for direct read-only queries)
3. Query library with templates
4. Run ledger for audit trail

---

## Phase Overview

| Phase | Name | Goal | Status |
|-------|------|------|--------|
| **1** | Schema Snapshot | Capture and version DB schema | ✅ COMPLETE |
| **2** | Claude SELECT Access | Read-only MCP server | ✅ COMPLETE |
| **3** | Query Library | Organized, parameterized queries | 🔲 FUTURE |
| **4** | Run Ledger | Audit trail for all operations | ✅ INTEGRATED (with Phase 2) |

---

## Phase 1: Schema Snapshot System

### 1A: Get Connection Details ✅ COMPLETE

**From RazorSQL (captured 2026-01-20):**
```
JDBC URL: jdbc:xactly://secure4.xactlycorp.com:443?useSSL=true
Driver Class: com.xactly.connect.jdbc.Driver
Driver JAR: /Users/DSnyder/Desktop/Drivers/xjdbc-with-dependencies-1.2.0-RELEASE 1.jar
Authentication: Login/Password
User: dsnyder@cydcor.com
```

### 1B: Store Credentials ✅ COMPLETE

**Added to `~/.claude/.env`:**
```
XACTLY_JDBC_URL=jdbc:xactly://secure4.xactlycorp.com:443?useSSL=true
XACTLY_DRIVER_CLASS=com.xactly.connect.jdbc.Driver
XACTLY_DRIVER_PATH=/Users/DSnyder/Desktop/Drivers/xjdbc-with-dependencies-1.2.0-RELEASE 1.jar
XACTLY_USER=dsnyder@cydcor.com
XACTLY_PASSWORD=<to be added>
```

### 1C: Build Schema Extraction Tool ✅ COMPLETE

**File:** `~/.claude/tools/xconnect/XConnectSchema.java` + `xconnect` CLI wrapper

**Commands available:**
```bash
xconnect schemas          # List all schemas (23 found)
xconnect tables [schema]  # List tables in schema
xconnect describe s.t     # Describe table columns
xconnect query "SELECT"   # Run SELECT query (SELECT only, max 1000 rows)
xconnect snapshot         # Full schema snapshot (ovrd, ovrd_dev, sfdc)
```

```
[x] Create schema query for PostgreSQL-compatible DB:
    - List all schemas
    - List all tables per schema
    - Get column definitions (name, type, nullable)
    - Get constraints (PK, FK, unique)
    - Get indexes

[ ] Output format: JSON snapshot
    {
      "snapshot_at": "ISO timestamp",
      "schemas": {
        "ovrd": {
          "tables": {
            "statements_modeling_dataset_history": {
              "columns": [...],
              "constraints": [...],
              "indexes": [...]
            }
          }
        }
      }
    }

[ ] CLI interface:
    bun XConnectSchema.ts snapshot
    bun XConnectSchema.ts diff --from file1.json --to file2.json
```

### 1D: First Snapshot ✅ COMPLETE

**First snapshot captured: 2026-01-20**
- File: `~/.claude/WORK/xConnect/SCHEMA/snapshots/2026-01-20.json`
- Size: 8,841 lines
- Schemas captured: ovrd, ovrd_dev, sfdc
- Tables in ovrd: 137 tables

```
[x] Run: xconnect snapshot
[x] Verify output in ~/.claude/WORK/xConnect/SCHEMA/snapshots/
[x] Review schema structure - ovrd has 137 tables including key modeling tables
```

### 1E: Diff Tool

```
[ ] Build diff comparison:
    - Added tables/columns
    - Removed tables/columns
    - Type changes
    - Constraint changes

[ ] Output: Human-readable diff + JSON
```

---

## Phase 2: Claude SELECT Access

### 2A: MCP Server Architecture

```
┌─────────────┐      ┌─────────────────────┐      ┌──────────────┐
│   Claude    │ ───► │  xconnect-mcp       │ ───► │ Xactly       │
│   (query)   │      │  (SELECT validate)  │      │ Connect DB   │
└─────────────┘      └──────────┬──────────┘      └──────────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │ LEDGER/runs.jsonl   │
                     │ (audit log)         │
                     └─────────────────────┘
```

### 2B: Security Implementation

```typescript
// Query validation - MUST pass before execution
function validateQuery(sql: string): boolean {
  const normalized = sql.toUpperCase().trim();

  // BLOCK list - never allow
  const blocked = [
    'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE',
    'ALTER', 'TRUNCATE', 'GRANT', 'REVOKE', 'EXEC'
  ];

  for (const keyword of blocked) {
    if (normalized.includes(keyword)) {
      throw new Error(`Blocked operation: ${keyword}`);
    }
  }

  // REQUIRE SELECT
  if (!normalized.startsWith('SELECT')) {
    throw new Error('Only SELECT queries allowed');
  }

  return true;
}
```

### 2C: MCP Server Tools ✅ COMPLETE

**Implemented:** `~/.claude/mcp-servers/xconnect/index.ts`

Tools exposed via MCP:
- `xconnect_query` - Execute SELECT query, return results (max 1000 rows)
- `xconnect_schema` - List all available schemas
- `xconnect_tables` - List all tables in a schema
- `xconnect_describe` - Describe specific table columns

### 2D: Registered in .mcp.json ✅ COMPLETE

```json
"xconnect": {
  "command": "bun",
  "args": ["run", "/Users/DSnyder/.claude/mcp-servers/xconnect/index.ts"],
  "cwd": "/Users/DSnyder/.claude/mcp-servers/xconnect",
  "env": {
    "XACTLY_JDBC_URL": "...",
    "XACTLY_DRIVER_PATH": "...",
    "XACTLY_USER": "...",
    "XACTLY_PASSWORD": "..."
  }
}
```

### 2E: Audit Logging ✅ COMPLETE

All operations logged to: `~/.claude/WORK/xConnect/LEDGER/runs.jsonl`

Log entry format:
```json
{
  "timestamp": "ISO-8601",
  "tool": "xconnect_query|xconnect_schema|xconnect_tables|xconnect_describe",
  "args": {...},
  "success": true|false,
  "error": "...",
  "duration_ms": 123,
  "row_count": 456
}
```

### 2F: Tests ✅ PASSING

- Query validation: 13/13 tests passed (blocks INSERT, UPDATE, DELETE, DROP, etc.)
- CLI integration: 6/6 tests passed (all tools functional)

---

## Context From VProcessing Brainstorm

The original pain points from today's brainstorm that this solves:

1. **"If I fetch it and lose it, it kills me"** → Schema snapshots + query ledger
2. **"Repeated querying + QA loops"** → Query templates + saved queries
3. **"What did I run? What changed?"** → Run ledger with full audit
4. **"Dev QA as you go"** → Pre/post verification patterns

---

## Relevant Files

| File | Purpose | Status |
|------|---------|--------|
| `~/.claude/WORK/xConnect/README.md` | Knowledge base overview | ✅ Created |
| `~/.claude/WORK/xConnect/SCHEMA/snapshots/` | Schema version history | ✅ First snapshot |
| `~/.claude/tools/xconnect/XConnectSchema.java` | Java schema extraction | ✅ Built |
| `~/.claude/tools/xconnect/xconnect` | CLI wrapper | ✅ Built |
| `~/.claude/mcp-servers/xconnect/index.ts` | MCP server for Claude | ✅ Built |
| `~/.claude/mcp-servers/xconnect/test-*.ts` | Test files | ✅ Passing |
| `~/.claude/WORK/xConnect/LEDGER/runs.jsonl` | Audit log | ✅ Configured |
| `~/.claude/.mcp.json` | MCP server registration | ✅ Updated |
| `~/.claude/.env` | Credentials | ✅ XACTLY_* vars added |

---

## To Resume Work

**For WORK sessions:**
- **"xConnect work"** → Work session with visual tracking → `XCONNECT-WORK.md`
- **"Query [table]"** → Run queries with visual output
- **"Describe [table]"** → Get table structure

**For BUILDING (infrastructure):**
- "Set up xConnect MCP server" → Phase 2
- "Continue xConnect operationalization" → Review build status

---

## Session Log

| Date | Work Done |
|------|-----------|
| 2026-01-20 | Created xConnect knowledge area. Continuation file created. Schema snapshot + Claude SELECT access prioritized. Need connection details from RazorSQL next. |
| 2026-01-20 | Phase 1 COMPLETE: Built Java-based schema extraction tool (XConnectSchema.java + xconnect CLI). First snapshot captured (8,841 lines, 137 tables in ovrd). Connection verified working. |
| 2026-01-20 | Created XCONNECT-WORK.md continuation for visual work sessions. Created SUBJECT-AREA.md documenting full OVRD compensation domain. Session rated 9/10. Phase 2 (MCP server) deferred to next session. |
| 2026-01-21 | Phase 2 COMPLETE: Built TypeScript MCP server (index.ts) with 4 tools (query, schema, tables, describe). SELECT-only validation enforced with comprehensive blocked keyword list. Audit logging to LEDGER/runs.jsonl. Registered in .mcp.json. All tests passing (19/19). Claude can now query Xactly Connect directly via MCP. |
