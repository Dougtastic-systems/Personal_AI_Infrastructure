---
capture_type: LEARNING
timestamp: 2026-01-20 12:18:25 PST
auto_captured: true
tags: [auto-capture]
---

# Quick Learning: xConnect schema tool working. First snapshot captured with 137 tables. Phase 1 complete.

**Date:** 2026-01-20
**Auto-captured:** Yes (use /capture-learning for detailed narrative)

---

## Summary

N/A

## Analysis

N/A

## Actions Taken

N/A

## Results

Phase 1 Schema Snapshot System complete

## Current Status

Phase 1 complete. Phase 2 (MCP server for Claude SELECT access) ready to begin.

## Next Steps

Build xConnect MCP server to give Claude direct SELECT access for database queries during conversations.

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

✅ RESULTS: Phase 1 Schema Snapshot System complete

**xConnect Tool Working:**
- Connection to Xactly Connect: ✅ Verified
- 23 schemas discovered (ovrd, ovrd_dev, sfdc, and 20 others)
- 137 tables in ovrd schema alone
- First snapshot: `~/.claude/WORK/xConnect/SCHEMA/snapshots/2026-01-20.json` (8,841 lines)

**Tool Commands:**
```bash
xconnect schemas          # List all schemas
xconnect tables ovrd      # List tables in ovrd
xconnect describe ovrd.statements_modeling_dataset_history  # Describe table
xconnect query "SELECT * FROM ovrd.ovrd_timeperiods LIMIT 5"  # Run query
xconnect snapshot         # Full schema snapshot
```

📊 STATUS: Phase 1 complete. Phase 2 (MCP server for Claude SELECT access) ready to begin.

📁 CAPTURE: xConnect schema extraction tool operational. Java-based approach using proprietary JDBC driver. Space in driver path required quoting fix in .env.

➡️ NEXT: Build xConnect MCP server to give Claude direct SELECT access for database queries during conversations.

📖 STORY EXPLANATION:
1. Continued from context compaction with schema extraction tool created but untested
2. First test failed due to space in driver path breaking env variable loading
3. Fixed bash wrapper to use `source` instead of `export $(grep)`
4. Fixed .env file to quote the path with spaces
5. Connection to Xactly Connect verified successful
6. Discovered 23 schemas including ovrd, ovrd_dev, sfdc
7. Ran full schema snapshot capturing 8,841 lines of schema metadata
8. Phase 1 complete - schema snapshot system operational, ready for Phase 2 MCP server

⭐ RATE (1-10): 

🗣️ NeonBrain: xConnect schema tool working. First snapshot captured with 137 tables. Phase 1 complete.

</details>
