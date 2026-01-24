---
capture_type: LEARNING
timestamp: 2026-01-24 12:18:37 PST
auto_captured: true
tags: [auto-capture]
---

# Quick Learning: PAI uses three-tier model selection. Sonnet default, Haiku for speed, Opus for deep reasoning. Subscription billing.

**Date:** 2026-01-24
**Auto-captured:** Yes (use /capture-learning for detailed narrative)

---

## Summary

N/A

## Analysis

N/A

## Actions Taken

N/A

## Results

N/A

## Current Status

N/A

## Next Steps

N/A

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

📋 **SUMMARY:** PAI uses a three-tier model selection system (fast/standard/smart) that maps to Haiku/Sonnet/Opus, with Sonnet as the default and explicit user control via `--level` flags.

🔍 **ANALYSIS:**

### Model Tiers in PAI

| Level | Model | Timeout | Use Case |
|-------|-------|---------|----------|
| `fast` | Haiku | 15s | Quick extractions, parallel grunt work, simple classification |
| `standard` | Sonnet | 30s | **Default** - balanced analysis, standard implementation |
| `smart` | Opus | 90s | Deep reasoning, architecture decisions, strategic planning |

### Key Finding: Subscription vs API

**PAI deliberately strips `ANTHROPIC_API_KEY`** at runtime in `Inference.ts` to force Claude Code subscription routing. This means:
- No per-call API billing
- Model selection doesn't directly impact your bill
- Usage is managed by your Claude Code subscription tier

### Where Selection Happens

```
~/.claude/skills/CORE/Tools/Inference.ts (Lines 56-60)
```

```typescript
const LEVEL_CONFIG = {
  fast: { model: 'haiku', defaultTimeout: 15000 },
  standard: { model: 'sonnet', defaultTimeout: 30000 },
  smart: { model: 'opus', defaultTimeout: 90000 },
};
```

⚡ **ACTIONS:** Deep dive into Inference.ts, settings.json, PAIAGENTSYSTEM.md, SKILLSYSTEM.md, and TOOLS.md.

✅ **RESULTS:**

### When to Use Each Model

| Scenario | Recommended | Why |
|----------|-------------|-----|
| Parallel agents doing grunt work | **Haiku** | 10-20x faster, same quality for simple tasks |
| Standard code implementation | **Sonnet** | Balanced (this is default) |
| Hook-based classification (sentiment, tabs) | **Sonnet** | Built-in default |
| Architecture planning | **Opus** | Maximum reasoning depth |
| Complex debugging | **Opus** | Needs nuanced analysis |
| Batch processing | **Haiku** | Volume efficiency |

### Usage Invocation

```bash
# Haiku (fast)
echo "prompt" | bun ~/.claude/tools/Inference.ts fast

# Sonnet (default - can omit level)
echo "prompt" | bun ~/.claude/tools/Inference.ts standard
echo "prompt" | bun ~/.claude/tools/Inference.ts

# Opus (smart)
echo "prompt" | bun ~/.claude/tools/Inference.ts smart
```

### Managing Usage - Key Insights

1. **Subscription model** = no per-call cost anxiety, but check your tier limits
2. **Sonnet is default** = most PAI operations use balanced tier automatically
3. **Haiku for parallel work** = when spawning multiple agents, prefer Haiku
4. **Opus for strategy** = reserve for architecture/deep reasoning tasks
5. **No automatic downgrading** = PAI is deterministic, uses what you specify

📊 **STATUS:** PAI model selection is explicit and task-driven, not automatic. Your main lever for managing usage is choosing the right `--level` flag when invoking inference.

📁 **CAPTURE:** Model selection config in `Inference.ts`, three-tier system (fast/standard/smart), subscription billing eliminates per-call costs.

➡️ **NEXT:**
1. For heavy parallel workloads, ensure agents use `model: "haiku"` 
2. Check Claude Code subscription tier for overall usage limits
3. Reserve Opus (`smart`) for strategic decisions only
4. Sonnet handles 90% of use cases appropriately

📖 **STORY EXPLANATION:**
1. PAI uses three named tiers: fast (Haiku), standard (Sonnet), smart (Opus)
2. Sonnet is the default when no level is specified
3. Selection is explicit via `--level` flag, never automatic
4. Uses Claude Code subscription, not API key billing
5. Haiku is 10-20x faster, ideal for parallel grunt work
6. Opus reserved for deep reasoning and architecture decisions
7. Configuration is hardcoded in Inference.ts for determinism
8. Managing usage = choosing appropriate tier per task, not per-call cost

⭐ **RATE (1-10):**

🗣️ NeonBrain: PAI uses three-tier model selection. Sonnet default, Haiku for speed, Opus for deep reasoning. Subscription billing.

</details>
