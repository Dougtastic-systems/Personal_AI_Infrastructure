# Continuation: Graphiti Nate Email Ingest

**Status:** Ready to Run | **Priority:** High

---

## Quick Start

```bash
cd ~/.claude/tools && source .venv/bin/activate

# Dry run first
python BatchNateIngest.py --dry-run --limit 5

# Run batch (fresh rate limit window)
python BatchNateIngest.py --limit 5
```

## Context

- 117 Nate emails in `MEMORY/learning/nate-b-jones/email-captures/`
- Pipeline: email_cleaner.py → BatchNateIngest.py → Neo4j
- Haiku 50K tokens/min limit → 60s delays between 5KB chunks
- graphiti-core 0.26.3 (upgraded from 0.26.0)

## Key Files

| File | Purpose |
|------|---------|
| `tools/BatchNateIngest.py` | Batch ingestion with rate limits |
| `tools/lib/email_cleaner.py` | Strip Substack boilerplate |
| `tools/GraphitiIngest.py` | Single episode ingestion |

## Estimates

- 10 emails = 56 chunks = ~56 min
- Full 117 emails = ~2 hours

---

Say: "Run Nate batch ingest" or "Test single email ingest"
