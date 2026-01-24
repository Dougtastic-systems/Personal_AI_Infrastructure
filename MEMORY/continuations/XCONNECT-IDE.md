# Continuation: xConnect IDE

**Created:** 2026-01-20
**Updated:** 2026-01-22
**Status:** SPRINT 7 STABLE - Ready for Daily Use
**Location:** `~/.claude/WORK/xConnect/ide/`

---

## Quick Start

```bash
cd ~/.claude/WORK/xConnect/ide

# Terminal 1: Backend (port 3001)
bun run server

# Terminal 2: Frontend (port 3000)
bun run dev

# Open http://localhost:3000
```

---

## Project Summary

**Goal:** Replace RazorSQL with a custom IDE for querying xConnect databases. Web-based, modern, learns from usage, and provides xConnect-specific features like pipeline visualization.

**Tech Stack:**
- React 18 + TypeScript + Vite (frontend)
- Hono (backend API, port 3001)
- Monaco Editor (SQL editing)
- TanStack Table (results grid)
- Tailwind CSS v3.4.17
- Bun runtime

---

## Sprint Status

| Sprint | Name | Status |
|--------|------|--------|
| 1 | Foundation | ✅ Complete |
| 2 | Schema Explorer | ✅ Complete |
| 3 | Monaco Editor | ✅ Complete |
| 4 | Results & History | ✅ Complete |
| 5 | Autocomplete & QA | ✅ Complete |
| 6 | Layout & Objects | ✅ Complete |
| **7** | **Pipeline Visualization** | ✅ **STABLE** |
| 8 | Step Details | 🔲 Future |
| 9 | Variables & Iterators | 🔲 Future |
| 10 | Production Polish | 🔲 Future |

---

## Current State (After Sprint 7 - STABLE)

### Layout
```
+--------------------------------------------------------------------------+
| Header: xConnect IDE                             [QA Mode] Read-Only     |
+------------------+----------------------------------+--------------------+
| [Schema]         | Query Editor       [Format][Clear]| Context Panel     |
| [Objects]        | [Run] +-------------------------+ | (when object      |
| [History]        |       | Monaco Editor           | |  selected)        |
|                  |       | - Ctrl+Enter execute    | |                   |
| w=320px          |       | - Ctrl+Up/Down history  | | - Name/Type       |
| (resizable)      +----------------------------------+ | - Description     |
|                  | Results (N rows in Xms) [exports] | - Table Refs      |
|                  | +--------------------------------+| - Members list    |
|                  | | Scrollable results table      | | - [Show Details]  |
+------------------+----------------------------------+--------------------+
| Status Bar: Connected localhost:3001 | Rows: N | Duration: Xms          |
+--------------------------------------------------------------------------+
```

### Features Working (Sprint 1-7)

**Core Query Features:**
- Schema tree expansion (schemas → tables → columns)
- Monaco editor with SQL syntax highlighting
- Column autocomplete (type `table.` for suggestions)
- Keyboard history navigation (Ctrl+Up/Down)
- TanStack Table with sorting, pagination
- Export: CSV, JSON, Copy to clipboard
- Query history with localStorage persistence
- QA Comparison mode overlay

**Pipeline Visualization (Sprint 7):**
- Objects tab with 9 pipelines and 53 steps
- **Recursive pipeline hierarchy** - expand nested pipelines infinitely
- **Object selection** with visual highlighting (accent border)
- **Context panel** - appears on right when object selected
- SHOW PIPELINE and SHOW STEP commands
- Table references UI (ready when data populated)

### API Endpoints
```typescript
GET  /api/schemas              → { schemas: string[] }
GET  /api/tables?schema=X      → { tables: [{name, schema, type}] }
GET  /api/describe/X/Y         → { columns: [{name, type}] }
POST /api/query {sql}          → { columns, rows, rowCount, duration }
GET  /api/objects/pipelines           → { pipelines: [{name, type}] }
GET  /api/objects/pipelines/:name/members → { members: [...] }
GET  /api/objects/steps               → { steps: [{name, description}] }
GET  /api/objects/steps/:name         → { step: {...} }
```

---

## Sprint 7: What Was Implemented

### 7.1 Pipeline Hierarchy Display ✅
- [x] Recursive expansion of nested pipelines
- [x] Show parent → child relationships
- [x] Indent nested members visually
- [x] Color-code: steps (📌) vs sub-pipelines (📦)
- [x] Loading states for async fetch

### 7.2 Flowchart Generation 🔲 (Deferred)
- [ ] Use Mermaid for diagrams
- [ ] Visual step dependencies
- [ ] Click node to view step details
- *Deferred to future sprint - prioritizing daily use*

### 7.3 Step Context Panel ✅
- [x] When step selected, show details panel
- [x] Include: name, description, table references
- [x] Resizable panel (200-500px)
- [x] Close button to dismiss

### 7.4 Table References ✅ (UI Ready)
- [x] Query `ovrd_dev.step_table_references` for step-table mappings
- [x] Show which tables a step reads/writes
- [x] UI displays source/target/join tables
- *Note: Table currently empty - UI ready when populated*

---

## Pending Observations & Design Changes

*Section for Daniel's feedback after daily use:*

| Date | Observation | Proposed Change | Priority |
|------|-------------|-----------------|----------|
| | | | |

---

## Sprint 8: Step Details (NEXT)

### Goal
Full step inspection with SQL syntax highlighting.

### Tasks
- [ ] Click step → show full SQL command
- [ ] Monaco editor (read-only) for step SQL
- [ ] Input/output tables for each step
- [ ] "Run Step" button (if step is SELECT-safe)

---

## Sprint 9: Variables & Iterators

### Goal
Browse xConnect variables and iterators.

### Tasks
- [ ] Add Variables tab to Objects browser
- [ ] Query xConnect variable definitions
- [ ] Show variable values in context
- [ ] Iterator browser with current values

---

## Sprint 10: Production Polish

### Goal
Stable, polished experience for daily use.

### Tasks
- [ ] Comprehensive error handling
- [ ] Loading states everywhere
- [ ] Keyboard shortcuts panel (? key)
- [ ] User preferences (theme, font size, editor settings)
- [ ] Export query as named snippet

---

## Key Files

```
~/.claude/WORK/xConnect/ide/
├── src/
│   ├── App.tsx                    # Main app, layout, SHOW parsing
│   ├── index.css                  # Global styles, CSS variables
│   ├── components/
│   │   ├── LeftSidebar.tsx        # Tabbed sidebar container
│   │   ├── SchemaTree.tsx         # Schema browser
│   │   ├── ObjectBrowser.tsx      # Pipelines/steps browser (recursive)
│   │   ├── ObjectContextPanel.tsx # NEW: Right-side detail panel
│   │   ├── QueryEditor.tsx        # Monaco editor wrapper
│   │   ├── ResultsTable.tsx       # TanStack table display
│   │   ├── QueryHistory.tsx       # History list
│   │   └── QAComparison.tsx       # Baseline comparison
│   └── hooks/
│       ├── useApi.ts              # Query execution hook
│       ├── useSchemaMetadata.ts   # Schema/table/column data
│       └── useObjectMetadata.ts   # Pipeline/step data
├── server/
│   ├── index.ts                   # Hono API server
│   └── xconnect.ts                # CLI wrapper
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## Technical Notes

**Pipeline hierarchy data:**
```sql
SELECT * FROM ovrd_dev.pipeline_members_raw
WHERE parent_pipeline = 'p_auto_lvl_POC_end_to_end'
ORDER BY execution_order;
```

**Step-table mappings:**
```sql
SELECT * FROM ovrd_dev.step_table_references
WHERE step_name = 's_aggregate_base_counts_revenue';
```

**Known limitation:** `labels` column in step_definitions causes Java serialization error - only query `name, description`.

---

## Test Commands

```sql
-- Test SHOW PIPELINE
SHOW PIPELINE p_auto_lvl_POC_end_to_end

-- Test SHOW STEP
SHOW STEP s_aggregate_base_counts_revenue;

-- Sample query
SELECT * FROM ovrd.auto_levels_computed WHERE period_year = 2025 LIMIT 100;

-- Check pipeline hierarchy
SELECT * FROM ovrd_dev.pipeline_members_raw WHERE parent_pipeline = 'p_auto_lvl_POC_end_to_end';
```

---

## To Resume Work

Say:
- **"Continue xConnect IDE"** → Load this context
- **"xConnect IDE status"** → Review sprint progress
- **"Add my observations"** → Record feedback from daily use
- **"Start Sprint 8"** → Begin Step Details implementation

---

## Session Log

| Date | Sprint | Work Done |
|------|--------|-----------|
| 2026-01-20 | S1-S5 | Foundation through Autocomplete & QA |
| 2026-01-20 | S6 | Layout restructure, Objects browser, SHOW commands |
| 2026-01-21 | S7 | Recursive pipeline hierarchy, object context panel |
| 2026-01-22 | S7 | Testing passed, marked STABLE for daily use |
