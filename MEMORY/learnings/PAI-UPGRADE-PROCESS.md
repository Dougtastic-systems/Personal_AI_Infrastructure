# PAI Upgrade Process Guide

**Created:** 2026-01-16
**Last Upgrade:** v2.2 → v2.3
**Author:** Dougtastic + NeonBrain

This document captures everything needed to upgrade PAI safely, with checkpoints, QA gates, and rollback procedures. Written for a novice who isn't expert in GitHub or code differentials.

---

## Quick Reference

| What | Location |
|------|----------|
| Your fork | `https://github.com/Dougtastic-systems/Personal_AI_Infrastructure.git` |
| Upstream (Daniel's) | `https://github.com/danielmiessler/PAI.git` |
| Local repo | `/Users/DSnyder/Personal_AI_Infrastructure` |
| Live PAI | `~/.claude/` |
| Backup location | `~/.claude-backup-pre-vX.X/` |

---

## Phase 1: Pre-Upgrade Preparation

### 1.1 Check for New Release

```bash
# Go to your fork
cd /Users/DSnyder/Personal_AI_Infrastructure

# Fetch upstream changes without applying them
git fetch upstream

# See what's new
git log main..upstream/main --oneline
```

**QA Gate 1:** You should see commits. If empty, no upgrade available.

### 1.2 Read the Release Notes

Before doing anything:
1. Check `https://github.com/danielmiessler/PAI/releases` for release notes
2. Look for breaking changes or migration notes
3. Note any new features that require configuration

**QA Gate 2:** You understand what's changing.

### 1.3 Document Your Current State

```bash
# Record your current version
grep paiVersion ~/.claude/settings.json

# List your customizations
ls ~/.claude/SKILLCUSTOMIZATIONS/
ls ~/.claude/MEMORY/
cat ~/.claude/.env | head -5  # Just verify it exists, don't expose keys
```

**Write down:**
- Current version: ___
- Custom skills: ___
- MEMORY folders with content: ___

---

## Phase 2: Backup (CRITICAL)

### 2.1 Backup Live Installation

```bash
# Create timestamped backup
VERSION="vX.X"  # Replace with current version
cp -r ~/.claude ~/.claude-backup-pre-${VERSION}

# Verify backup
ls ~/.claude-backup-pre-${VERSION}/
```

**QA Gate 3:** Backup directory exists with all content.

### 2.2 Backup to GitHub (Optional but Recommended)

```bash
cd /Users/DSnyder/Personal_AI_Infrastructure

# Commit any local changes to your fork
git add -A
git commit -m "chore: Back up local customizations before ${VERSION} upgrade"
git push origin main
```

**QA Gate 4:** Your fork on GitHub has your latest customizations.

---

## Phase 3: Merge Upstream Changes

### 3.1 The Piggyback Method (Recommended)

This merges Daniel's changes while preserving your customizations:

```bash
cd /Users/DSnyder/Personal_AI_Infrastructure

# Ensure you're on main
git checkout main

# Merge upstream
git merge upstream/main
```

### 3.2 Handle Merge Conflicts

If conflicts occur:
1. Git will list conflicted files
2. Open each file and look for `<<<<<<<` markers
3. Choose which version to keep (usually upstream for system files, yours for customizations)
4. After resolving: `git add <file>` then `git commit`

**Common conflict locations:**
- `settings.json` - Keep your identity fields, take upstream structure
- `hooks/` - Usually take upstream entirely
- `MEMORY/` - Keep yours (shouldn't conflict)

**QA Gate 5:** `git status` shows clean working tree.

### 3.3 Push Merged Result

```bash
git push origin main
```

**QA Gate 6:** Your fork now has upstream changes + your customizations.

---

## Phase 4: Deploy to Live Installation

### 4.1 Copy New Release

If the repo has a `Releases/vX.X/.claude/` folder:

```bash
# Deploy the new version
cp -r /Users/DSnyder/Personal_AI_Infrastructure/Releases/vX.X/.claude ~/

# Verify
ls ~/.claude/
```

If upgrading directly from repo (no Releases folder):

```bash
# Deploy from repo root
cp -r /Users/DSnyder/Personal_AI_Infrastructure/.claude ~/
```

### 4.2 Restore User Data

**CRITICAL - These are YOUR files, not system files:**

```bash
# Restore MEMORY (your learnings, sessions, backlog)
cp -r ~/.claude-backup-pre-vX.X/MEMORY/* ~/.claude/MEMORY/

# Restore .env (your API keys)
cp ~/.claude-backup-pre-vX.X/.env ~/.claude/

# Restore SKILLCUSTOMIZATIONS (your YouTube channels, etc.)
cp -r ~/.claude-backup-pre-vX.X/SKILLCUSTOMIZATIONS/* ~/.claude/SKILLCUSTOMIZATIONS/ 2>/dev/null || true
```

### 4.3 Restore Identity in settings.json

**MANUAL STEP - Edit `~/.claude/settings.json`:**

Find and update these fields with your values:

```json
{
  "daidentity": {
    "name": "NeonBrain",
    "fullName": "NeonBrain - Dougtastic's AI Assistant",
    "displayName": "NeonBrain",
    "startupCatchphrase": "NeonBrain here, ready to go."
  },
  "principal": {
    "name": "Dougtastic",
    "timezone": "America/Los_Angeles"
  }
}
```

### 4.4 Fix Known Issues

**PAI_DIR Tilde Bug:**

The default `settings.json` uses `~/.claude` for `PAI_DIR`, but `/bin/sh` doesn't expand tildes. Fix it:

```bash
# Check current value
grep PAI_DIR ~/.claude/settings.json

# If it shows "~/.claude", change to full path:
# Edit settings.json and change:
#   "PAI_DIR": "~/.claude"
# To:
#   "PAI_DIR": "/Users/DSnyder/.claude"
```

**QA Gate 7:** `grep PAI_DIR ~/.claude/settings.json` shows full path, not tilde.

---

## Phase 5: Validation

### 5.1 Run Built-in Validation

```bash
cd ~/.claude && bun run install.ts --validate
```

**Expected output:**
```
✓ settings.json: Valid
✓ CORE skill: Found
✓ All directories exist
```

### 5.2 Test Hook Execution

```bash
# Test a hook directly
/Users/DSnyder/.claude/hooks/StartupGreeting.hook.ts
```

**QA Gate 8:** Hook runs without "No such file or directory" error.

### 5.3 Verify Data Restoration

```bash
# Check MEMORY was restored
ls ~/.claude/MEMORY/

# Check .env exists
test -f ~/.claude/.env && echo "OK" || echo "MISSING"

# Check identity
grep '"name":' ~/.claude/settings.json | head -3
```

**QA Gate 9:** All your data is present.

### 5.4 Full Functional Test

```bash
# Start a new Claude Code session
claude
```

**Verify:**
- [ ] Startup greeting shows your AI name (NeonBrain)
- [ ] No hook errors in output
- [ ] PAI banner displays correctly

**QA Gate 10:** Fresh session works without errors.

---

## Phase 6: Rollback Procedure

If something goes wrong at any point:

### 6.1 Quick Rollback

```bash
# Remove broken installation
rm -rf ~/.claude

# Restore from backup
cp -r ~/.claude-backup-pre-vX.X ~/.claude

# Verify
bun run ~/.claude/install.ts --validate
```

### 6.2 Verify Rollback

```bash
# Check version reverted
grep paiVersion ~/.claude/settings.json

# Test
claude
```

**Your backup stays intact until you explicitly delete it.**

---

## User Data Reference

### Files That Are YOURS (Always Preserve)

| Location | Contents |
|----------|----------|
| `MEMORY/` | Learnings, sessions, backlog, decisions |
| `.env` | API keys (ElevenLabs, Anthropic, etc.) |
| `SKILLCUSTOMIZATIONS/` | YouTube channels, skill preferences |
| `settings.json` (partial) | Identity fields only (see below) |

### Settings.json Fields That Are YOURS

```
principal.name
principal.timezone
daidentity.name
daidentity.fullName
daidentity.displayName
daidentity.startupCatchphrase
daidentity.voiceId (if customized)
```

### Files That Are SYSTEM (Take from Upstream)

| Location | Contents |
|----------|----------|
| `hooks/` | All hook files |
| `skills/` | All skills (except personal `_CAPS` folders) |
| `agents/` | Agent configurations |
| `install.ts` | Installation wizard |
| `PAISECURITYSYSTEM/` | Security configuration |
| `VoiceServer/` | Voice synthesis server |

---

## Known Issues & Fixes

### Issue: Hook "No such file or directory"

**Symptom:** Hooks fail with `/bin/sh: ~/.claude/hooks/X.hook.ts: No such file or directory`

**Cause:** `PAI_DIR` set to `~/.claude` but tilde doesn't expand in `/bin/sh`

**Fix:** Change `settings.json`:
```json
"env": {
  "PAI_DIR": "/Users/DSnyder/.claude",  // Full path, not ~/
}
```

### Issue: Identity Reset to Defaults

**Symptom:** AI greets you as "User" or uses default name "PAI"

**Cause:** New `settings.json` overwrote your identity

**Fix:** Edit `settings.json` and restore your identity fields (see 4.3)

---

## Upgrade Checklist (Copy This)

```
## Pre-Upgrade
- [ ] Checked for new release
- [ ] Read release notes
- [ ] Documented current state

## Backup
- [ ] Created ~/.claude-backup-pre-vX.X
- [ ] (Optional) Pushed to GitHub fork

## Merge
- [ ] Fetched upstream
- [ ] Merged without conflicts (or resolved them)
- [ ] Pushed merged result

## Deploy
- [ ] Copied new release to ~/.claude
- [ ] Restored MEMORY/
- [ ] Restored .env
- [ ] Restored SKILLCUSTOMIZATIONS/
- [ ] Updated identity in settings.json
- [ ] Fixed PAI_DIR tilde bug

## Validate
- [ ] install.ts --validate passed
- [ ] Hook test passed
- [ ] Data restoration verified
- [ ] Fresh session works

## Cleanup (After Confirming Everything Works)
- [ ] (Optional) Delete old backup
```

---

## Action Items / Unknowns

### To Research
- [ ] Can install.ts be enhanced to auto-detect and fix the PAI_DIR tilde issue?
- [ ] Should identity fields be migrated automatically by the wizard?
- [ ] Best location for this document (currently in MEMORY/learnings/)

### To Build
- [ ] Add "upgrade" mode to install.ts that handles backup/restore automatically
- [ ] Create pre-flight validation that checks PAI_DIR is absolute path
- [ ] Add `--upgrade-from vX.X` flag to streamline process

---

## Version History

| Date | Upgrade | Notes |
|------|---------|-------|
| 2026-01-16 | v2.2 → v2.3 | First documented upgrade. Discovered tilde bug. |

---

**Remember:** Your backup is your safety net. Don't delete `~/.claude-backup-pre-vX.X` until you've run PAI successfully for at least a few days.
