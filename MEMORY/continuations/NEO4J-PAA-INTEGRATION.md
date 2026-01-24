# Continuation: Neo4j Local Setup & PAA Integration

**Created:** 2026-01-20
**Status:** PHASE 2L' COMPLETE - Ready for Phase 3 Documentation
**Phases:** 3 (Install → Wire Up with Graphiti → Documentation)

---

## Executive Summary

Install Neo4j locally with the console/browser interface, then wire it up to PAA for knowledge graph storage using Graphiti for temporal memory management. The graph will serve as temporal memory for captured ideas, concepts, and their relationships.

---

## Graphiti Integration Decision

**Date:** 2026-01-20

**Choice:** PATH B (Hybrid) - Keep OntologyExtract, use Graphiti for temporal storage

**Rationale:**
- **OntologyExtract stays**: Our OntologyExtract is tuned to our specific domain (captures, concepts, entities, tasks). It understands PAA's ontology.
- **Graphiti provides**: Bi-temporal data model (valid_at + created_at), hybrid retrieval (semantic + graph + temporal), entity resolution, automatic contradiction detection.
- **Philosophy**: Iterative refinement - OntologyExtract and Graphiti will "ping pong" as we refine each. OntologyExtract handles domain-specific extraction, Graphiti handles storage and retrieval.

**Reference:** https://github.com/getzep/graphiti

---

## Phase Overview

| Phase | Name | Goal | Status |
|-------|------|------|--------|
| **1** | Local Installation | Neo4j running with browser console | ✅ COMPLETE |
| **2** | PAA Integration | Graph database wired to capture pipeline | 🔄 IN PROGRESS |
| **3** | Documentation | End-to-end system architecture doc | 🔲 PENDING |

### Phase 2 Sub-Phase Status

| Sub-Phase | Name | Status |
|-----------|------|--------|
| 2A | Neo4j Desktop | ⏭️ SKIPPED (browser console sufficient) |
| 2B | Install neo4j-driver | ✅ COMPLETE |
| 2C | Connection module | ✅ COMPLETE |
| 2D | Schema definition | ✅ COMPLETE |
| 2E | OntologyExtract | ✅ COMPLETE |
| 2F | GraphIngest | ✅ COMPLETE |
| 2G' | Install Graphiti | ✅ COMPLETE |
| 2H' | Define Custom Entity Types | ✅ COMPLETE |
| 2I' | Adapt GraphIngest for Graphiti | ✅ COMPLETE |
| 2J' | Build Query Layer | ✅ COMPLETE |
| 2K' | MCP Server with Graphiti | ✅ COMPLETE |
| 2L' | CaptureIngest Integration | ✅ COMPLETE |

---

## Phase 1: Install Neo4j (Homebrew Method - Recommended)

**Goal:** Neo4j running locally with browser console accessible.

**Source:** https://neo4j.com/docs/operations-manual/current/installation/osx/

### 1A: Prerequisites

```
[ ] 1. Verify Java 21 is installed:
      java -version

      If not installed:
      brew install openjdk@21

      Then add to PATH:
      echo 'export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"' >> ~/.zshrc
      source ~/.zshrc
```

### 1B: Install Neo4j via Homebrew

```
[ ] 1. Install Neo4j Community Edition:
      brew install neo4j

      This installs:
      - Neo4j server
      - Neo4j Browser (web console)
      - Configures as macOS service

[ ] 2. Note the config location:
      /opt/homebrew/Cellar/neo4j/<version>/libexec/conf/neo4j.conf
```

### 1C: Start Neo4j Service

```
[ ] 1. Start as background service (auto-starts on boot):
      brew services start neo4j

      Or run in foreground (logs visible):
      neo4j console

[ ] 2. Verify service is running:
      brew services list

      Should show: neo4j started
```

### 1D: Access Browser Console

```
[ ] 1. Open browser to: http://localhost:7474

[ ] 2. First login credentials:
      - Username: neo4j
      - Password: neo4j

[ ] 3. You'll be prompted to set a new password
      → Set to your secure password for PAA

[ ] 4. Run test query in browser:
      RETURN "Hello PAA!" as message

[ ] 5. Should see result in table view
```

### 1E: Store Credentials

```
[ ] Add to ~/.claude/.env:
    NEO4J_URI=bolt://localhost:7687
    NEO4J_USER=neo4j
    NEO4J_PASSWORD=your_password_here
```

### 1F: Useful Commands

```bash
# Start service (runs in background, auto-starts on boot)
brew services start neo4j

# Stop service
brew services stop neo4j

# Restart service (after config changes)
brew services restart neo4j

# Check status
brew services list

# Run in foreground (see logs)
neo4j console

# View logs
tail -f /opt/homebrew/var/log/neo4j.log
```

### Phase 1 Success Criteria

- [ ] Java 21 installed
- [ ] Neo4j installed via Homebrew
- [ ] Service running (`brew services list` shows started)
- [ ] Browser console accessible at localhost:7474
- [ ] Password changed from default
- [ ] Test query returns result
- [ ] Credentials stored in .env

---

---

## Phase 2: Wire Up to PAA

**Goal:** PAA capture pipeline can write to and read from Neo4j graph with ontology extraction.

### Phase 2 Architecture

```
                         ONTOLOGY EXTRACTION PIPELINE
═══════════════════════════════════════════════════════════════════════════

  Raw Capture                    Inference                      Neo4j
  ───────────                    ─────────                      ─────

  "Talked to Mike about      ┌─────────────────┐
   PAA architecture.    ────►│ OntologyExtract │
   He thinks we should       │   (Inference)   │
   use event sourcing.       └────────┬────────┘
   Follow up next week."              │
                                      ▼
                              ┌───────────────┐
                              │  Structured   │
                              │    Output     │
                              └───────┬───────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
         ▼                            ▼                            ▼
  (:Entity)                    (:Concept)                    (:Task)
  name: "Mike"                 name: "event sourcing"        desc: "Follow up"
  type: "person"               name: "PAA architecture"      due: "next week"
         │                            │                            │
         └────────────────────────────┼────────────────────────────┘
                                      │
                                      ▼
                              (:Capture)──[:MENTIONS]──►(:Entity)
                                  │
                                  ├──[:CONTAINS]──►(:Concept)
                                  │
                                  └──[:CREATES]──►(:Task)
```

---

### 2A: Install Neo4j Desktop (Better UI)

**Purpose:** Visual graph exploration, better debugging, multiple database management.

```
[ ] 1. Download from: https://neo4j.com/download/
[ ] 2. Install .dmg, move to Applications
[ ] 3. Launch Neo4j Desktop
[ ] 4. Add Remote Connection:
      - Connect URL: bolt://localhost:7687
      - Authentication: No authentication
      - Name: "PAA-Local-Homebrew"
[ ] 5. Verify connection shows existing database
```

**Note:** Desktop connects to your existing Homebrew-installed Neo4j. You now have two ways to access:
- **Browser** (localhost:7474): Quick queries, always available
- **Desktop**: Better visualization, graph exploration, debugging

---

### 2B: Install Neo4j Driver

```
[ ] 1. Navigate to PAI tools:
      cd ~/.claude/tools

[ ] 2. Install neo4j driver:
      bun add neo4j-driver

[ ] 3. Verify installation:
      bun pm ls | grep neo4j
```

---

### 2C: Create Graph Connection Module

**File:** `~/.claude/tools/lib/neo4j.ts`

```typescript
// Connection singleton for PAA graph database (no auth)
import neo4j, { Driver, Session } from 'neo4j-driver';

let driver: Driver | null = null;

export function getDriver(): Driver {
  if (!driver) {
    const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
    // No auth configured - connect directly
    driver = neo4j.driver(uri);
  }
  return driver;
}

export function getSession(): Session {
  return getDriver().session();
}

export async function closeDriver(): Promise<void> {
  if (driver) {
    await driver.close();
    driver = null;
  }
}

// Helper for running single queries
export async function runQuery(cypher: string, params?: Record<string, any>) {
  const session = getSession();
  try {
    const result = await session.run(cypher, params);
    return result.records;
  } finally {
    await session.close();
  }
}
```

---

### 2D: Define PAA Ontology Schema

**Core node types for knowledge graph:**

```cypher
// Capture - Raw captured content (source of truth)
(:Capture {
  id: string,           // UUID
  captured_at: datetime,
  source: string,       // "sms", "voice", "drop", "email", "chatgpt"
  content: string,      // Raw text
  tags: [string],       // Auto-tags from capture
  processed: boolean,
  file_path: string     // Reference to MEMORY/captured/raw/
})

// Concept - Extracted ideas/topics/patterns
(:Concept {
  id: string,
  name: string,         // Canonical name (lowercase, normalized)
  display_name: string, // Human-readable
  description: string,
  category: string,     // "idea", "pattern", "topic", "technology", "principle"
  created_at: datetime,
  mention_count: int
})

// Entity - People, places, organizations, projects
(:Entity {
  id: string,
  name: string,
  type: string,         // "person", "place", "organization", "project", "product"
  aliases: [string],    // Alternative names
  properties: map,
  created_at: datetime
})

// Task - Actionable items extracted from captures
(:Task {
  id: string,
  description: string,
  status: string,       // "pending", "in_progress", "done", "cancelled"
  priority: string,     // "high", "medium", "low"
  due_date: datetime,
  created_at: datetime,
  completed_at: datetime
})
```

**Relationship types:**

```cypher
// Capture → extracted items
(:Capture)-[:MENTIONS {context: string}]->(:Entity)
(:Capture)-[:CONTAINS {relevance: float}]->(:Concept)
(:Capture)-[:CREATES]->(:Task)
(:Capture)-[:FOLLOWS]->(:Capture)  // Temporal sequence

// Concept relationships
(:Concept)-[:RELATES_TO {strength: float}]->(:Concept)
(:Concept)-[:PART_OF]->(:Concept)
(:Concept)-[:CONTRADICTS]->(:Concept)
(:Concept)-[:EVOLVED_FROM]->(:Concept)

// Entity relationships
(:Entity)-[:WORKS_ON]->(:Concept)
(:Entity)-[:KNOWS]->(:Entity)
(:Entity)-[:ASSOCIATED_WITH]->(:Entity)

// Task relationships
(:Task)-[:ASSIGNED_TO]->(:Entity)
(:Task)-[:RELATES_TO]->(:Concept)
(:Task)-[:BLOCKED_BY]->(:Task)
```

---

### 2E: Build Ontology Extraction Tool

**File:** `~/.claude/tools/OntologyExtract.ts`

**Purpose:** Uses LLM inference to parse raw text into structured ontology.

```
[ ] 1. Create extraction prompt template:

SYSTEM: You are an ontology extraction system. Given raw text, extract:
- ENTITIES: People, places, organizations, projects mentioned
- CONCEPTS: Ideas, topics, patterns, technologies discussed
- TASKS: Action items, todos, follow-ups implied
- RELATIONSHIPS: How entities and concepts relate

Output as JSON matching the schema.

[ ] 2. Create OntologyExtract.ts:
      - Input: raw text string
      - Calls Inference.ts (standard tier for quality)
      - Parses JSON response
      - Returns structured { entities, concepts, tasks, relationships }

[ ] 3. Handle edge cases:
      - Empty/minimal content → skip extraction
      - Ambiguous entities → flag for review
      - Duplicate concepts → merge with existing
```

**Extraction Schema (JSON output):**

```json
{
  "entities": [
    { "name": "Mike", "type": "person", "context": "discussed architecture" }
  ],
  "concepts": [
    { "name": "event sourcing", "category": "pattern", "relevance": 0.9 },
    { "name": "PAA architecture", "category": "topic", "relevance": 1.0 }
  ],
  "tasks": [
    { "description": "Follow up with Mike about event sourcing", "due": "next week", "priority": "medium" }
  ],
  "relationships": [
    { "from": "Mike", "to": "event sourcing", "type": "RECOMMENDS" },
    { "from": "event sourcing", "to": "PAA architecture", "type": "RELATES_TO" }
  ]
}
```

---

### 2F: Build Graph Ingest Module

**File:** `~/.claude/tools/GraphIngest.ts`

```
[ ] 1. Create GraphIngest.ts that:
      - Receives raw capture + file path
      - Calls OntologyExtract to get structured data
      - Creates/merges Capture node
      - Creates/merges Entity nodes (dedup by name+type)
      - Creates/merges Concept nodes (dedup by normalized name)
      - Creates Task nodes
      - Creates all relationships
      - Returns summary of what was created

[ ] 2. Implement deduplication:
      - Entities: MERGE on (name, type)
      - Concepts: MERGE on normalized name
      - Captures: CREATE (always unique)
      - Tasks: CREATE (always unique)

[ ] 3. Add CLI interface:
      bun ~/.claude/tools/GraphIngest.ts <capture-file>
      bun ~/.claude/tools/GraphIngest.ts --text "raw text here"
```

---

### 2G': Install Graphiti

**Purpose:** Add Graphiti to leverage its bi-temporal model and hybrid retrieval while keeping our domain-tuned OntologyExtract.

```
[ ] 1. Install Graphiti core:
      pip install graphiti-core

[ ] 2. Verify connection to existing Neo4j:
      - Uses same bolt://localhost:7687
      - No additional Neo4j configuration needed

[ ] 3. Test basic Graphiti operations:
      from graphiti_core import Graphiti
      graphiti = Graphiti("bolt://localhost:7687")
      await graphiti.build_indices_and_constraints()
```

**Note:** Graphiti will create its own indices/constraints alongside our existing schema. They coexist.

---

### 2H': Define Custom Entity Types

**Purpose:** Map our PAA ontology to Graphiti's entity system using Pydantic models.

**File:** `~/.claude/tools/lib/graphiti_types.py`

```python
[ ] 1. Create Pydantic models for PAA entity types:

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CaptureEntity(BaseModel):
    """Raw captured content - source of truth"""
    source: str  # "sms", "voice", "drop", "email", "chatgpt"
    content: str
    tags: List[str] = []
    file_path: Optional[str] = None

class ConceptEntity(BaseModel):
    """Extracted ideas/topics/patterns"""
    name: str
    display_name: str
    category: str  # "idea", "pattern", "topic", "technology", "principle"
    description: Optional[str] = None

class PersonEntity(BaseModel):
    """People mentioned in captures"""
    name: str
    aliases: List[str] = []
    context: Optional[str] = None

class TaskEntity(BaseModel):
    """Actionable items from captures"""
    description: str
    status: str = "pending"
    priority: str = "medium"
    due_date: Optional[datetime] = None

[ ] 2. Register entity types with Graphiti
```

---

### 2I': Adapt GraphIngest for Graphiti

**Purpose:** OntologyExtract outputs JSON, which becomes a Graphiti episode.

**File:** Modify `~/.claude/tools/GraphIngest.ts` or create `~/.claude/tools/GraphitiIngest.py`

```
[ ] 1. Pipeline flow:
      Raw Text → OntologyExtract → JSON → Graphiti Episode

[ ] 2. Implementation:
      - OntologyExtract.ts produces structured JSON (unchanged)
      - GraphitiIngest wraps JSON as Graphiti episode
      - graphiti.add_episode() handles temporal storage
      - Graphiti manages entity resolution and deduplication

[ ] 3. Episode creation:
      episode = {
          "name": f"capture-{timestamp}",
          "episode_body": ontology_json,
          "source": "paa-ontology-extract",
          "reference_time": capture_timestamp  # bi-temporal: when it happened
      }
      await graphiti.add_episode(
          name=episode["name"],
          episode_body=json.dumps(episode["episode_body"]),
          source=episode["source"],
          reference_time=episode["reference_time"]
      )

[ ] 4. Test with existing test capture
```

---

### 2J': Build Query Layer

**Purpose:** Leverage Graphiti's hybrid retrieval (semantic + graph + temporal).

**File:** `~/.claude/tools/GraphitiQuery.py`

```
[ ] 1. Core query methods:
      - graphiti.search(query) - Semantic + graph search
      - graphiti.get_context(query) - Retrieve relevant context
      - Historical queries with time bounds

[ ] 2. PAA-specific queries:
      # Recent captures with temporal context
      results = await graphiti.search(
          query="What have I captured about event sourcing?",
          limit=10
      )

      # Entity-focused retrieval
      context = await graphiti.get_context(
          query="My conversations with Mike",
          entity_filters=["PersonEntity"]
      )

      # Time-bounded search
      results = await graphiti.search(
          query="Tasks created this week",
          start_time=week_start,
          end_time=now
      )

[ ] 3. CLI interface:
      python GraphitiQuery.py search "event sourcing"
      python GraphitiQuery.py context "Mike"
      python GraphitiQuery.py timeline --days 7
      python GraphitiQuery.py tasks --status pending
```

---

### 2K': MCP Server with Graphiti Tools

**File:** `~/.claude/mcp-servers/graphiti-memory/`

**Purpose:** Expose Graphiti to Claude for knowledge graph operations during conversations.

```
[ ] 1. Create MCP server with tools:
      - memory_search: Hybrid search (semantic + graph + temporal)
      - memory_context: Get relevant context for a query
      - memory_ingest: Add new capture via OntologyExtract → Graphiti
      - memory_timeline: Recent captures with temporal metadata
      - memory_entity: Get all info about an entity
      - memory_stats: Node/relationship counts

[ ] 2. Register in Claude settings.json:
      "graphiti-memory": {
        "command": "python",
        "args": ["-m", "graphiti_mcp_server"],
        "cwd": "~/.claude/mcp-servers/graphiti-memory"
      }

[ ] 3. Test queries:
      - "Search my memory for event sourcing discussions"
      - "What context do I have about Mike?"
      - "Show captures from the last week"
```

---

### 2L': CaptureIngest Integration

**Purpose:** Wire the complete pipeline: Drop → OntologyExtract → Graphiti episode.

```
[ ] 1. Modify CaptureIngest.ts:
      - After storing in MEMORY/captured/raw/
      - Call OntologyExtract.ts for structured extraction
      - Pass JSON to GraphitiIngest for episode creation
      - Return episode ID in capture metadata

[ ] 2. Configuration flags:
      - GRAPHITI_INGEST_ENABLED=true/false
      - GRAPHITI_MIN_LENGTH=50 (skip tiny captures)
      - GRAPHITI_SOURCES=["voice", "chatgpt", "drop"]

[ ] 3. Full pipeline test:
      echo "Meeting with Mike about PAA" | bun CaptureIngest.ts
      # → Creates raw file
      # → Extracts ontology
      # → Stores as Graphiti episode
      # → Returns capture + episode IDs
```

---

### Phase 2 Success Criteria

**Foundation (Complete):**
- [x] Neo4j running locally with browser console
- [x] neo4j-driver installed in PAI tools
- [x] Connection module working (no auth)
- [x] OntologyExtract parses text → structured JSON
- [x] GraphIngest writes to Neo4j with dedup

**Graphiti Integration:**
- [x] Graphiti installed and connected to Neo4j
- [x] Custom entity types defined (Person, Concept, Project, Task, Organization, Location, Event)
- [x] GraphitiIngest converts text → episodes via Graphiti
- [x] Query layer provides hybrid retrieval (GraphitiQuery.py)
- [x] MCP server exposes Graphiti tools to Claude
- [x] CaptureIngest triggers full pipeline (Drop → Extract → Episode) ← **Phase 2L' COMPLETE**

---

## Phase 3: System Documentation

**Goal:** Create comprehensive end-to-end documentation of the knowledge graph system.

### Documentation Scope

```
[ ] 1. Architecture Overview
      - System diagram: Captures → Extraction → Storage → Retrieval
      - Component relationships and data flow
      - Why Graphiti + OntologyExtract hybrid approach

[ ] 2. Component Reference
      - Neo4j: Local setup, no-auth config, browser console
      - Graphiti: Python SDK, bi-temporal model, entity resolution
      - OntologyExtract: Domain-tuned LLM extraction
      - GraphitiIngest: CLI for manual ingestion
      - GraphitiQuery: CLI for search/retrieval
      - MCP Server: Tools exposed to Claude

[ ] 3. Data Model
      - Entity types (Person, Concept, Project, Task, etc.)
      - Edge types (RECOMMENDS, RELATES_TO, WORKS_ON, etc.)
      - Bi-temporal properties (valid_at, created_at)
      - How Graphiti handles entity resolution and dedup

[ ] 4. Usage Patterns
      - How Claude uses memory tools in conversation
      - Manual CLI workflows for power users
      - Querying: semantic search, timeline, entity-focused
      - Example queries and expected outputs

[ ] 5. Pipeline Integration (after Phase 2L')
      - Full flow: Drop/Voice/SMS → CaptureIngest → Graph
      - Configuration flags and thresholds
      - Error handling and fallbacks
```

### Output Location

`~/.claude/SYSTEM/KNOWLEDGEGRAPHSYSTEM.md` or `~/.claude/skills/CORE/SYSTEM/KNOWLEDGEGRAPHSYSTEM.md`

### Phase 3 Success Criteria

- [ ] Single document explains entire system end-to-end
- [ ] Someone new could understand architecture from doc alone
- [ ] Includes working examples and commands
- [ ] Diagrams show data flow clearly
- [ ] Linked from CORE skill and DOCUMENTATIONINDEX.md

---

## Architecture After Integration

```
                    CAPTURE FLOW WITH NEO4J
═══════════════════════════════════════════════════════════════════

   Input Sources              Processing              Storage
   ─────────────              ──────────              ───────

   SMS/Voice/File    →    CaptureIngest    →    MEMORY/captured/raw/
                              │                        │
                              │                        │
                              ▼                        │
                         GraphIngest    ──────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │     Neo4j       │
                    │  PAA-Knowledge  │
                    │     Graph       │
                    └─────────────────┘
                              │
                              ▼
                         GraphQuery
                              │
                              ▼
                     "What relates to X?"
                     "Timeline of captures"
                     "Find all tasks"
```

---

## Backup Strategy

```
[ ] Add Neo4j dump to backup routine:
    1. Neo4j Desktop has built-in dump
    2. Schedule daily dump → ~/.claude/MEMORY/backups/neo4j/
    3. Sync to Cloudflare R2: pai-backups/neo4j/
```

---

## Files Reference

| File | Purpose | Status |
|------|---------|--------|
| `~/.claude/tools/lib/neo4j.ts` | Connection module | ✅ Complete |
| `~/.claude/tools/lib/neo4j-schema.ts` | Schema definitions & management | ✅ Complete |
| `~/.claude/tools/OntologyExtract.ts` | LLM-based ontology extraction | ✅ Complete |
| `~/.claude/tools/GraphIngest.ts` | Write captures to Neo4j | ✅ Complete |
| `~/.claude/tools/lib/graphiti_types.py` | Pydantic entity models | ✅ Complete |
| `~/.claude/tools/GraphitiIngest.py` | CLI for ingesting text → Graphiti | ✅ Complete |
| `~/.claude/tools/GraphitiQuery.py` | Hybrid query layer CLI | ✅ Complete |
| `~/.claude/mcp-servers/graphiti-memory/` | MCP server for Claude | ✅ Complete |
| `~/.claude/tools/CaptureIngest.ts` | Full pipeline integration | ✅ Complete |
| `~/.claude/.env` | Credentials | ✅ Not needed (no auth) |

---

## To Resume Work

**Quick Resume:** Say "Continue Neo4j/Graphiti integration" or paste this context:

```
CONTINUATION: Neo4j/Graphiti Knowledge Graph Integration

STATUS: Phase 2L' (CaptureIngest Integration) COMPLETE. Phase 3 (Documentation) remains.

WHAT'S WORKING:
- Neo4j running locally (bolt://localhost:7687, no auth)
- Graphiti installed (graphiti-core 0.26.0) with Python venv
- OntologyExtract → GraphitiIngest pipeline operational
- GraphitiQuery CLI for semantic search
- MCP Server with 6 tools registered in Claude

REMAINING TASKS:
1. Phase 3 - Documentation: End-to-end system architecture doc

QUICK COMMANDS:
source ~/.claude/tools/.venv/bin/activate
python ~/.claude/tools/GraphitiIngest.py "test text" --pretty
python ~/.claude/tools/GraphitiQuery.py search "event sourcing" --pretty

READ: ~/.claude/MEMORY/continuations/NEO4J-PAA-INTEGRATION.md
```

**Or say:**
- **"Wire up CaptureIngest"** → Phase 2L' (pipeline integration)
- **"Document the knowledge graph system"** → Phase 3 (new)

### Quick Resume Context

**What's working:**
```bash
# Activate Python venv
source ~/.claude/tools/.venv/bin/activate

# Ingest text to knowledge graph
python ~/.claude/tools/GraphitiIngest.py "Meeting with Mike about architecture"
python ~/.claude/tools/GraphitiIngest.py --file notes.txt --source "meeting"
echo "Voice memo" | python ~/.claude/tools/GraphitiIngest.py --pretty

# Query the knowledge graph (NEW!)
python ~/.claude/tools/GraphitiQuery.py search "event sourcing" --pretty
python ~/.claude/tools/GraphitiQuery.py context "Mike" --pretty
python ~/.claude/tools/GraphitiQuery.py timeline --last 10 --pretty
python ~/.claude/tools/GraphitiQuery.py entities --limit 20 --pretty
python ~/.claude/tools/GraphitiQuery.py stats --pretty

# Test Graphiti connection
python3 -c "
from graphiti_core import Graphiti
import asyncio
async def test():
    g = Graphiti('bolt://localhost:7687', 'neo4j', '')
    print('Connected!')
    await g.close()
asyncio.run(test())
"

# Original PAA tools still work
bun ~/.claude/tools/lib/neo4j.ts health
bun ~/.claude/tools/GraphIngest.ts --text "your text" --level fast
```

**What's in the graph (Graphiti schema):**
- 1 Episodic node (test episode)
- 4 Entity nodes: Mike, PAA, event sourcing, capture pipeline
- 3 EntityEdge relationships with facts
- 24+ Graphiti indices for search optimization
- Group: "paa-default"

**Graphiti Setup:**
- Python venv: `~/.claude/tools/.venv/`
- OpenAI API key: `~/.claude/.env` (OPENAI_API_KEY)
- Version: graphiti-core 0.26.0
- Docs: https://github.com/getzep/graphiti

**MCP Server (Phase 2K' - COMPLETE):**
- MCP server at `~/.claude/mcp-servers/graphiti-memory/`
- 6 tools: memory_search, memory_ingest, memory_timeline, memory_stats, memory_context, memory_entities
- Registered in `~/.claude/.mcp.json`
- Claude can now query/write to knowledge graph during conversations
- Restart Claude Code to load the new MCP server

**CaptureIngest Integration (Phase 2L' - COMPLETE):**
- CaptureIngest.ts calls GraphitiIngest.py after storing raw captures
- Pipeline: Drop → CaptureIngest → MEMORY/captured/raw/ + Graphiti episode
- Config flags in GRAPHITI_CONFIG:
  - `GRAPHITI_INGEST_ENABLED` (default: true)
  - `GRAPHITI_MIN_LENGTH` (default: 50 chars)
  - `GRAPHITI_SOURCES` (default: ["voice", "chat-export", "drop", "meeting"])
- Episode UUID stored in capture metadata under `graphiti` key

**Next: Phase 3 - Documentation**
- Create end-to-end system architecture doc
- Location: `~/.claude/SYSTEM/KNOWLEDGEGRAPHSYSTEM.md`

---

## Performance Testing

### Round 1 Results (2026-01-21)

**Test Configuration:**
- Tool: `OntologyExtract.ts` → Inference (standard/Sonnet level)
- Test Script: `~/.claude/WORK/xConnect/prototype/ontology-perf-test.ts`
- Test Cases: 5 (meeting note, technical discussion, personal capture, complex multi-entity, minimal)

**Metrics:**
| Metric | Value |
|--------|-------|
| Average Latency | 8,544ms |
| Total Time (5 tests) | 42.7s |
| Entity Pass Rate | 4/5 (80%) |
| Concept Pass Rate | 5/5 (100%) |

**Per-Test Results:**
| Test | Chars | Latency | Entities | Concepts | Tasks | Relationships |
|------|-------|---------|----------|----------|-------|---------------|
| Meeting Note | 398 | 9.4s | 6 ✓ | 6 ✓ | 1 | 10 |
| Technical Discussion | 441 | 9.1s | 3 ✓ | 6 ✓ | 1 | 8 |
| Personal Capture | 365 | 7.8s | 1 ✗ | 6 ✓ | 2 | 5 |
| Complex Multi-Entity | 541 | 12.5s | 7 ✓ | 6 ✓ | 6 | 15 |
| Minimal Content | 30 | 3.9s | 1 ✓ | 0 ✓ | 1 | 1 |

**Quality Observations:**
1. **Strong entity extraction** for people, organizations, products
2. **Consistent concept extraction** (~6 items per text)
3. **Reliable task extraction** (captures "follow up", "need to", etc.)
4. **Rich relationship generation** (10-15 for complex texts)
5. **Minor miss:** Twitter not extracted from "explore building in public on Twitter"

**Potential Optimizations:**
- [ ] Test `fast` level (Haiku) for latency reduction
- [ ] Evaluate if 6-concept cap is prompt-limited
- [ ] Consider entity type expansion (social_platform, book, etc.)
- [ ] Batch processing for multiple texts

---

## Session Log

| Date | Work Done |
|------|-----------|
| 2026-01-20 | Two-phase plan created. Ready to start Phase 1. |
| 2026-01-20 | **Phase 1 COMPLETE:** Java 21 installed, Neo4j 2025.12.1 via Homebrew, auth disabled, browser console verified, test query successful. |
| 2026-01-20 | **Phase 2B-2F COMPLETE:** neo4j-driver installed, connection module built, schema initialized (4 constraints, 14 indexes), OntologyExtract built with LLM inference, GraphIngest built and tested - first capture written to knowledge graph! |
| 2026-01-20 | **GRAPHITI DECISION:** Chose PATH B (Hybrid) - Keep OntologyExtract for domain-tuned extraction, use Graphiti for bi-temporal storage and hybrid retrieval. Updated phases 2G-2L to 2G'-2L' with Graphiti integration steps. Philosophy: iterative refinement between OntologyExtract and Graphiti. |
| 2026-01-20 | **Phase 2G' COMPLETE:** Created Python venv at `~/.claude/tools/.venv/`, installed graphiti-core 0.26.0, added OpenAI API key to `.env`, built Graphiti indices (24 new indices), tested episode ingest (4 entities, 3 edges created), tested semantic search - "event sourcing" and "Mike" queries return relevant facts. Graphiti fully operational! |
| 2026-01-20 | **Phase 2H' COMPLETE:** Created `lib/graphiti_types.py` with 7 entity types (Person, Concept, Project, Task, Organization, Location, Event) and 6 edge types (WORKS_ON, RECOMMENDS, RELATES_TO, ASSIGNED_TO, PART_OF, MENTIONED_IN). Tested with rich meeting notes - extracted 12 entities with proper labels [Entity, Person], [Concept, Entity] and 11 relationships with meaningful facts. Custom types guide extraction beautifully! |
| 2026-01-20 | **Phase 2I' COMPLETE:** Created `GraphitiIngest.py` CLI tool. Accepts text via args, stdin, or file. Outputs JSON with episode_uuid, entities, edges. Tested with team standup notes (9 entities, 4 edges) and Slack DM (6 entities, 4 edges). Supports --source, --time, --group, --verbose, --pretty flags. Ready for pipeline integration! |
| 2026-01-20 | **Phase 2J' COMPLETE:** Created `GraphitiQuery.py` with 5 commands: search (semantic facts), context (facts + episodes), timeline (recent episodes), entities (list nodes), stats (graph metrics). Graph now has 28 entities, 4 episodes, 18 relationships. Entity types: 11 Concept, 6 Person, 4 Organization, 2 Project, 1 Location. Full hybrid retrieval working! |
| 2026-01-20 | **Phase 2K' COMPLETE:** Built MCP Server at `~/.claude/mcp-servers/graphiti-memory/`. 6 tools: memory_search, memory_ingest, memory_timeline, memory_stats, memory_context, memory_entities. Registered in `~/.claude/.mcp.json`. All tools tested successfully - Claude can now query/write to knowledge graph during conversations! |
| 2026-01-20 | **CONTINUATION UPDATED:** Added Phase 3 (Documentation) to scope. Remaining: Phase 2L' (CaptureIngest wiring) + Phase 3 (end-to-end system docs). |
| 2026-01-21 | **Phase 2L' COMPLETE:** Wired CaptureIngest.ts to GraphitiIngest.py. Added GRAPHITI_CONFIG with enabled/minLength/sources flags. After raw file write, spawns Python script via temp file. Episode UUID, name, entity count, edge count stored in capture metadata under `graphiti` key. Fixed datetime parsing for milliseconds. Tested: Drop → raw file → Dot queue → Graphiti episode (5 entities, 3 edges). Reingest command also updated. |
| 2026-01-21 | **PERF TEST ROUND 1:** OntologyExtract performance benchmark completed. 5 test cases (meeting note, technical discussion, personal capture, complex multi-entity, minimal content). Results: Avg latency 8.5s (standard level), Entity pass rate 80%, Concept pass rate 100%. Key findings: Entity extraction strong for people/orgs, concept extraction consistently rich (6 items avg), task extraction reliable. One miss: Twitter not extracted as entity from social media context. Test script: `WORK/xConnect/prototype/ontology-perf-test.ts`. |
