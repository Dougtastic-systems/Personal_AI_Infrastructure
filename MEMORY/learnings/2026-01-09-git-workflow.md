# Git Workflow for PAI Updates

**Date:** 2026-01-09
**Context:** Setting up upstream sync process

## The Pattern

Three-remote git workflow for maintaining a fork with customizations:

```
upstream (danielmiessler/PAI) → origin (your private repo)
```

## Key Commands

```bash
pai-update check   # See what's new from upstream
pai-update sync    # Merge upstream changes
pai-update push    # Push to your GitHub
```

## Why This Matters

- Keeps your PAI current with Daniel's improvements
- Preserves your customizations
- Single command for weekly maintenance

## Related

- Script location: `~/Personal_AI_Infrastructure/scripts/pai-update`
- Cheatsheet: `~/Personal_AI_Infrastructure/scripts/GIT-CHEATSHEET.md`
