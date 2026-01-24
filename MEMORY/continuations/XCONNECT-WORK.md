# Continuation: xConnect Work Session

**Created:** 2026-01-20
**Status:** ACTIVE - Systemized tooling operational
**Location:** `~/.claude/WORK/xConnect/`

---

## Quick Start

```bash
# Check connection
xconnect schemas

# List tables in ovrd
xconnect tables ovrd

# Describe a table
xconnect describe ovrd.statements_modeling_dataset_history

# Run a query
xconnect query "SELECT * FROM ovrd.ovrd_timeperiods LIMIT 5"
```

---

## Visual Work Tracking

### Current Session State

```
┌─────────────────────────────────────────────────────────────────────┐
│  xConnect Work Session                                              │
├─────────────────────────────────────────────────────────────────────┤
│  📊 SCHEMA: 23 schemas | 137 tables in ovrd                         │
│  📅 SNAPSHOT: 2026-01-20 (8,841 lines)                              │
│  🔗 CONNECTION: jdbc:xactly://secure4.xactlycorp.com:443            │
├─────────────────────────────────────────────────────────────────────┤
│  ACTIVE QUERIES                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  [none running]                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  RECENT RESULTS                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  [session start - no queries yet]                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Work Log Template

When running queries, Claude will report in this format:

```
┌─ QUERY ────────────────────────────────────────────────────────────┐
│ SELECT c_icl_code, computed_level                                  │
│ FROM ovrd.auto_levels_computed                                     │
│ WHERE period_year = 2026 AND period_num = 1                        │
│ LIMIT 10                                                           │
├─ RESULT ───────────────────────────────────────────────────────────┤
│ Rows: 10 | Time: 1.2s | Schema: ovrd.auto_levels_computed         │
├────────────────────────────────────────────────────────────────────┤
│ c_icl_code    │ computed_level │                                   │
│ ─────────────┼────────────────│                                   │
│ ICL001       │ 5              │                                   │
│ ICL002       │ 3              │                                   │
│ ...          │ ...            │                                   │
└────────────────────────────────────────────────────────────────────┘
```

---

## Subject Area

**Domain:** Cydcor OVRD Compensation System
**Scope:** Statements, Levels, BPL - Full compensation pipeline

### Primary Tables

| Group | Primary Table | Purpose |
|-------|---------------|---------|
| **Statements** | `statements_modeling_dataset_history` | Historical modeling data |
| **Levels** | `auto_levels_computed` | Current computed levels |
| **BPL** | `auto_lvl_hierarchy_bpl_merged` | Business performance data |
| **Reference** | `ovrd_timeperiods` | Period definitions |

### Key Identifiers

| Entity | Column | Example |
|--------|--------|---------|
| ICL | `c_icl_code` | 'ABC123' |
| Period | `period_year`, `period_num` | 2026, 1 |
| Pay Week | `pay_week` | 1-4 |
| Level | `computed_level` | 0-10 |

Full subject area documentation: `~/.claude/WORK/xConnect/SUBJECT-AREA.md`

---

## Tooling Reference

### CLI Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `xconnect schemas` | List all schemas | Get schema names |
| `xconnect tables [schema]` | List tables | `xconnect tables ovrd` |
| `xconnect describe s.t` | Describe table | `xconnect describe ovrd.auto_levels_computed` |
| `xconnect query "SQL"` | Run SELECT | `xconnect query "SELECT * FROM ovrd.ovrd_timeperiods"` |
| `xconnect snapshot` | Full schema capture | Creates JSON snapshot |

### Security

- **SELECT only** - All other operations blocked
- **1000 row limit** - Prevents runaway queries
- **Blocked keywords**: INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, TRUNCATE, GRANT, REVOKE

### Files

| File | Purpose |
|------|---------|
| `~/.claude/tools/xconnect/xconnect` | CLI wrapper |
| `~/.claude/tools/xconnect/XConnectSchema.java` | JDBC tool |
| `~/.claude/.env` | Credentials (XACTLY_*) |
| `~/.claude/WORK/xConnect/SCHEMA/snapshots/` | Schema versions |
| `~/.claude/WORK/xConnect/SUBJECT-AREA.md` | Domain documentation |

---

## Common Workflows

### 1. Explore Table Structure

```bash
# What columns does this table have?
xconnect describe ovrd.auto_levels_computed

# Sample data
xconnect query "SELECT * FROM ovrd.auto_levels_computed LIMIT 5"
```

### 2. Period-Based Analysis

```bash
# Get current periods
xconnect query "SELECT * FROM ovrd.ovrd_timeperiods ORDER BY period_year DESC, period_num DESC LIMIT 5"

# Data for specific period
xconnect query "SELECT COUNT(*) FROM ovrd.auto_levels_computed WHERE period_year = 2026 AND period_num = 1"
```

### 3. ICL Lookup

```bash
# Find ICL data
xconnect query "SELECT * FROM ovrd.auto_levels_computed WHERE c_icl_code = 'ABC123'"
```

### 4. Schema Change Detection

```bash
# Capture new snapshot
xconnect snapshot > ~/.claude/WORK/xConnect/SCHEMA/snapshots/2026-01-21.json

# Compare (manual for now - diff tool coming)
diff snapshots/2026-01-20.json snapshots/2026-01-21.json
```

---

## Work Session Patterns

### Start of Session

1. Verify connection: `xconnect schemas`
2. Check current period in `ovrd_timeperiods`
3. Review what we're investigating

### During Work

- All queries logged in conversation
- Results shown in visual format
- Intermediate findings captured

### End of Session

- Summary of queries run
- Key findings documented
- Next steps identified

---

## Visual Output Standards

When I run queries, I will show results in structured visual formats:

### Single Value Results
```
┌─ RESULT ─────────────────────────────┐
│ COUNT(*) = 15,234                    │
│ Period: 2026-P1 | Table: auto_levels │
└──────────────────────────────────────┘
```

### Table Results
```
┌─ ovrd.auto_levels_computed ──────────────────────────┐
│ Rows: 10 of 15,234 | Period: 2026-P1                │
├──────────────┬────────────┬───────────────┬─────────┤
│ c_icl_code   │ level      │ first_gens    │ revenue │
├──────────────┼────────────┼───────────────┼─────────┤
│ ICL001       │ 5          │ 12            │ 45,230  │
│ ICL002       │ 3          │ 8             │ 28,100  │
└──────────────┴────────────┴───────────────┴─────────┘
```

### Aggregation Results
```
┌─ LEVEL DISTRIBUTION ─────────────────────────────────┐
│                                                      │
│ Level 10: ████████████████████████████████████  892  │
│ Level 9:  ██████████████████████████████       756  │
│ Level 8:  █████████████████████████            612  │
│ Level 7:  ████████████████████                 489  │
│ Level 6:  ███████████████                      372  │
│ Level 5:  ████████████                         298  │
│ ...                                                  │
└──────────────────────────────────────────────────────┘
```

---

## To Resume Work

Say any of:
- **"xConnect work"** → Start work session with visual tracking
- **"Query [table]"** → Run a query with visual output
- **"What periods are active?"** → Check ovrd_timeperiods
- **"Describe [table]"** → Get table structure
- **"Compare schema"** → Check for schema changes

---

## Session Log

| Date | Work Done |
|------|-----------|
| 2026-01-20 | Initial setup. Tool built, connection verified, first snapshot captured. Session rated 9/10. |

---

## Current Focus

**Active Investigation:** [None - ready for work]

**Questions to Answer:**
- [Add questions as they arise]

**Findings:**
- [Capture discoveries here]
