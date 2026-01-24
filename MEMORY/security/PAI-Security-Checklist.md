# PAI Security Checklist

**Created:** 2026-01-11
**Last Audit:** 2026-01-11
**Next Review:** Weekly or after major changes

---

## Quick Reference: Current Protection Status

| Layer | Status | Notes |
|-------|--------|-------|
| **Claude Code Hooks** | Active | security-validator.ts blocking dangerous patterns |
| **Claude Code Permissions** | Default | No explicit deny rules (relying on hooks + manual approval) |
| **macOS App Permissions** | Minimal | Claude has Accessibility & Local Network OFF |
| **macOS Firewall** | ON | Python, Ruby, remoted blocked; work services allowed |
| **MCP Servers** | Clean | None configured |
| **API Keys** | Exposed | In plaintext - needs secret storage solution |

---

## Outstanding Security Items

### High Priority

| Item | Status | Action Needed |
|------|--------|---------------|
| API keys in plaintext | Not resolved | Set up secret storage (Keychain, 1Password, etc.) |
| ElevenLabs key exposed | Not rotated | Rotate after secret storage is set up |
| Google API key exposed | Not rotated | Rotate after secret storage is set up |
| Keys duplicated in 2 files | Not consolidated | Single source of truth after storage solution |

### Medium Priority (Optional Hardening)

| Item | Status | Action Needed |
|------|--------|---------------|
| Explicit deny rules | Skipped | Current hooks sufficient; add later if desired |
| WebFetch/WebSearch restrictions | Not configured | Consider if external web access is concern |
| Project-level settings | Not configured | Add per-project restrictions if needed |

### Completed

| Item | Date | Notes |
|------|------|-------|
| macOS Firewall enabled | 2026-01-11 | Tightened app rules |
| Blocked Python3 incoming | 2026-01-11 | Firewall rule |
| Blocked Ruby incoming | 2026-01-11 | Firewall rule |
| Blocked remoted incoming | 2026-01-11 | Firewall rule |
| Disabled auto-allow signed apps | 2026-01-11 | Firewall setting |
| Audited macOS permissions | 2026-01-11 | Claude has minimal access |

---

## Periodic Review Checklists

### Daily (When Using PAI)

- [ ] Review `git diff` before ending session
- [ ] Check `git status` for unexpected files
- [ ] Don't auto-approve permissions without reading

### Weekly

- [ ] Run `/permissions` in Claude Code - review what's allowed
- [ ] Check `~/.claude/mcp.json` - any new MCP servers?
- [ ] Quick scan: `grep -r "sk_\|api_key\|API_KEY" ~/.claude/` - any new exposed keys?

### Monthly

- [ ] Review and rotate API keys (once secret storage is set up)
- [ ] Check `~/.claude/hooks/security-validator.ts` - patterns still current?
- [ ] Audit `.env` files - remove unused keys
- [ ] Review firewall rules - System Settings > Network > Firewall > Options

### After Major Changes

- [ ] Run `git log --oneline -20` - review recent commits
- [ ] Verify hooks still execute (check for startup message)
- [ ] Test that blocked commands are still blocked

---

## Red Flags - Always Deny These

| Pattern | Why It's Dangerous |
|---------|-------------------|
| `curl \| bash` or `wget \| bash` | Remote code execution |
| `rm -rf /` or `rm -rf *` | Catastrophic deletion |
| Unknown MCP server additions | External system access |
| Requests to read `.env` files | Credential exposure |
| `git push --force` | Overwrites history |
| Base64 encoded commands | Obfuscation/hiding intent |
| `chmod 777` | World-writable files |
| `sudo` anything | Elevated privileges |

Your security-validator.ts hook blocks most of these automatically.

---

## Current Configuration Files

| File | Purpose | Contains Secrets? |
|------|---------|-------------------|
| `~/.claude/settings.json` | Hooks, env vars | YES - API keys |
| `~/.claude/.env` | Environment variables | YES - API keys |
| `~/.claude/mcp.json` | MCP server config | No (currently empty) |
| `~/.claude/hooks/security-validator.ts` | Command validation | No |

---

## macOS Firewall Rules (As of 2026-01-11)

| Service | Status | Reason |
|---------|--------|--------|
| Control Center | Allow | System feature |
| cupsd | Allow | Printer sharing |
| Python3 | **Block** | No incoming needed |
| remoted | **Block** | Remote Apple Events not used |
| Ruby | **Block** | No incoming needed |
| sharingd | Allow | AirDrop/Handoff |
| smbd | Allow | Windows file sharing (have Windows PC) |
| sshd-keygen-wrapper | Allow | SSH operations |

**Global Settings:**
- Built-in software: Allow
- Downloaded signed software: **Block** (must approve each)
- Stealth mode: Off (work network compatibility)

---

## macOS App Permissions for Claude

| Permission | Status |
|------------|--------|
| Accessibility | Listed, OFF |
| Local Network | Listed, OFF |
| Microphone | Not requested |
| Camera | Not requested |
| Speech Recognition | Not requested |
| Automation | Not listed |
| Developer Tools | Not listed |
| Full Disk Access | Not visible in Tahoe |
| Files and Folders | Not visible in Tahoe |

---

## Security Validator Hook Coverage

Your `~/.claude/hooks/security-validator.ts` blocks these attack patterns:

| Tier | Category | Action |
|------|----------|--------|
| 1 | Catastrophic deletion (rm -rf) | Block |
| 2 | Reverse shells | Block |
| 3 | Credential theft (curl\|bash) | Block |
| 4 | Prompt injection | Block |
| 5 | Environment manipulation | Warn |
| 6 | Dangerous git operations | Confirm |
| 7 | System modification (sudo) | Log |
| 8 | Network operations (ssh, scp) | Log |
| 9 | Data exfiltration | Block |
| 10 | PAI protection (.claude deletion) | Block |

---

## Future Considerations

### When You Set Up Secret Storage

1. Choose a solution: macOS Keychain, 1Password CLI, or encrypted .env
2. Move API keys out of plaintext files
3. Update settings.json to reference secure storage
4. Rotate all exposed keys
5. Update this checklist

### If You Add MCP Servers

1. Research each server before adding
2. Understand what access it requires
3. Document in this checklist
4. Monitor for unexpected behavior

### If You Add Permission Deny Rules

Add to `~/.claude/settings.json`:
```json
{
  "permissions": {
    "deny": [
      "Bash(curl:*)",
      "Bash(wget:*)",
      "Read(.env*)",
      "WebFetch"
    ]
  }
}
```

---

## Contacts for Security Questions

- Claude Code docs: https://docs.anthropic.com/claude-code
- PAI Infrastructure: This repo
- Anthropic support: https://support.anthropic.com

---

*This checklist was created during a security audit session. Update after each review.*
