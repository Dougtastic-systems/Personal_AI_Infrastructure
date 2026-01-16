# PAI Git Cheatsheet (ADHD-Friendly Edition)

## The ONE Command You Need

```bash
pai-update
```

That's it. Run this when you want to check for updates.

---

## Quick Reference Card

| What You Want | Command | When |
|---------------|---------|------|
| See if updates exist | `pai-update check` | Weekly habit |
| Get the updates | `pai-update sync` | After checking |
| Save to your GitHub | `pai-update push` | After syncing |
| See overall status | `pai-update` | Anytime |

---

## The Mental Model (Memorize This)

```
Daniel's Repo → Your Local → Your GitHub
   (source)      (testing)     (backup)
```

- **Check** = "Is there new stuff?"
- **Sync** = "Give me the new stuff"
- **Push** = "Save my stuff to cloud"

---

## Weekly Ritual (2 minutes)

Every week (maybe Monday morning?):

1. Open terminal
2. Run: `pai-update check`
3. If updates exist: `pai-update sync`
4. Test PAI still works: `pai`
5. Backup to GitHub: `pai-update push`

Done.

---

## When Things Go Wrong

### "Merge conflict detected!"

Don't panic. You have options:

**Option A: Abort and try later**
```bash
git merge --abort
```

**Option B: Fix it (with help)**
- Ask me (NeonBrain) to help resolve the conflict
- I can see the files and help you decide what to keep

### "You have uncommitted changes!"

```bash
git stash              # Hide your changes temporarily
pai-update sync        # Do the update
git stash pop          # Bring your changes back
```

### "Authentication failed"

First time pushing? You need to authenticate with GitHub:
```bash
git push -u origin main
```
This will prompt for credentials or open a browser.

---

## Understanding the Remotes

```bash
git remote -v
```

You should see:
- `origin` = Your GitHub repo (Dougtastic-systems/Personal_AI_Infrastructure)
- `upstream` = Daniel's repo (danielmiessler/PAI)

---

## Golden Rules

1. **Never force push** (`git push --force` = bad)
2. **Always test after sync** (run `pai` to check it works)
3. **Commit before sync** (no uncommitted changes)
4. **When confused, ask NeonBrain** (I can see your git state)

---

## Your Repos

| Name | URL | Purpose |
|------|-----|---------|
| Upstream (Daniel's) | github.com/danielmiessler/PAI | Source of updates |
| Your Private | github.com/Dougtastic-systems/Personal_AI_Infrastructure | Your customized version |

---

## If All Else Fails

Tell me: "NeonBrain, help me fix my git situation"

I can see your repo state and guide you through it.
