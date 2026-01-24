# Investigation: Claude Code Permissions & Security

**Created:** 2026-01-11
**Purpose:** Understand and configure Claude Code's permission system to reduce friction while maintaining security

---

## The Problem

When Claude Code wants to modify files outside the current project, you see:

```
[Deny] [Escape] [Always allow for project local] [Allow once]
```

This is cumbersome when working across your PAI infrastructure (skills in `~/.claude/skills/`, memory in `~/.claude/MEMORY/`, etc.)

---

## Questions to Investigate

1. **What triggers the permission prompt?**
   - File paths outside current working directory?
   - Specific directories marked as sensitive?
   - First-time access to any new path?

2. **What does "Always allow for project local" actually do?**
   - Does it remember across sessions?
   - Is it stored somewhere configurable?
   - Does it apply to subdirectories?

3. **Security implications:**
   - What's the risk of "always allow"?
   - Can permissions be scoped (e.g., allow ~/.claude/* but not ~/Documents/*)?
   - What protections remain if you allow everything?

4. **Configuration options:**
   - Is there a config file for pre-approved paths?
   - Can hooks handle this differently?
   - What about workspace trust settings?

---

## Where to Look

1. **Claude Code documentation:**
   - Use claude-code-guide agent to search for permission system docs
   - Look for: "permissions", "security", "trust", "allow"

2. **Local config files:**
   ```
   ~/.claude/settings.json
   ~/.claude/config.json
   ~/.claude/projects/*/
   .claude/ in project directories
   ```

3. **Environment variables:**
   - Any CLAUDE_* vars that affect permissions?

4. **The permission prompt itself:**
   - What exactly is "project local"?
   - Does escape just skip, or does it block?

---

## Desired Outcome

A configuration where:
- `~/.claude/skills/*` - Always allowed (your skill files)
- `~/.claude/MEMORY/*` - Always allowed (your memory system)
- `~/Personal_AI_Infrastructure/*` - Always allowed (your PAI repo)
- Other paths - Still prompt for safety

Or understanding why this isn't possible/advisable.

---

## To Resume

```
Open a new Claude Code session and paste:

"I want to understand Claude Code's permission system. Read the continuation prompt at ~/.claude/MEMORY/continuations/claude-code-permissions.md for context, then help me investigate:
1. How permissions work
2. What configuration options exist
3. How to reduce prompts for my trusted directories (~/.claude/, ~/Personal_AI_Infrastructure/)
4. Security tradeoffs of different approaches"
```
