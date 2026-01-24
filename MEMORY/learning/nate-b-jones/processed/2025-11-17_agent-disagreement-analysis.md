# Anthropic, Google, and Vercel All Disagree on AI Agents

**Original:** email-captures/2026-01-23_anthropic-google-and-vercel-all-disagree-on-ai-agents-here-s.md
**Date:** 2025-11-17
**Type:** analysis
**Tags:** AI agents, orchestration, Google whitepaper, Vercel, Claude Code hack, security, back-office automation

## Core Thesis
Three dramatically different agent visions emerged in the same week: Google's 50-page orchestration-first architecture, Vercel's practical back-office ROI focus, and Anthropic's Claude Code hack report. They integrate into a path: build where work is verifiable and bounded (Vercel), treat orchestration as the security perimeter from day one (Anthropic lesson), and scale toward comprehensive agent architecture (Google vision).

## Key Concepts
- **Orchestration Layer as Security Perimeter**: Model-level safety cannot be the sole defense. If orchestration lacks sophistication, the model assists in breaking systems one innocent step at a time. Security must enforce policy at the orchestration layer.
- **Agents as Loops (5-Step)**: Receive goal → Gather context → Reason and plan → Execute via tools → Observe and iterate. The cycle continues until mission completion.
- **Five Levels of Agentic Capability**: Level 0 (reasoning only), Level 1 (+ tools), Level 2 (+ complex context engineering), Level 3 (+ multi-agent specialization), Level 4 (+ dynamic tool/agent creation).
- **No God Agent**: A universal agent would require excessive context and fail under load. Work must distribute across many small loops and human decision points. The future is necessarily decentralized.
- **Agents as First-Class Identities**: Agents must be treated in IAM systems as semi-autonomous employees—roles, budgets, personas, policies within RBAC. Not scripts or service accounts.

## Mental Models
- **Vercel's "Build It Now" Filter**: Work must be (1) verifiable, (2) step-wise and bounded, (3) recurring and painful, (4) with known inputs/outputs, (5) with human in the loop.
- **Three-Question Agent Assessment**: Is this work verifiable and bounded? Is this recurring toil? Do I know what orchestration guardrails belong around it? Three "yes" = build now. Any "no" = wait.
- **Google's Control Plane Vision**: Central gateway for all agentic traffic (user→agent, agent→tool, agent→agent). Handles auth, policy enforcement, unified observability. Central registry as enterprise app store for agents/tools.

## Predictions/Bets
- **Orchestration Becomes Mandatory**: Claude Code hack proves it's not theoretical. If you don't build the orchestration layer, someone hostile will from outside your network.
- **Back-Office First**: Current-generation agentic AI achieves highest success with low cognitive load, high repetition work. Too dynamic for scripts, predictable enough for AI.
- **Multi-Agent Systems Coming**: Level 3 (specialist agent teams) and Level 4 (dynamic agent creation) represent both most interesting applications and most substantial technical challenges.

## Tools & Products Mentioned
| Tool | Category | Nate's Take |
|------|----------|-------------|
| Google Agents Whitepaper | Documentation | 50-page argument for orchestration-first. Prescient given Claude Code hack timing |
| Vercel AI SDK | Framework | Practical back-office focus. generateObject for categorization, Slack webhooks for approval |
| Claude Code | Dev tool | Used in state-linked cyber operation. Model decomposed harmful tasks into benign-looking components |
| Agent2Agent (A2A) | Protocol | Google's protocol for well-defined agent communication interfaces |
| MCP | Protocol | Model Context Protocol for agent-to-tool calls |
| SPIFFE | Security | Standard for cryptographically verifiable agent identities |
| Model Armor | Security | Optional service for screening prompts/responses for threats |

## Prompts/Resources Included
- **AI Agent Strategy Prompt**: Three-angle conversation—smart agent opportunities at work, best hands-on contribution in agent era, correct security stance for agents

## Quotable Lines
> "TLDR nobody can agree on what AI agents are for, and meanwhile they clearly are powerful because bad guys are using them to attack high value targets yesterday."
> "If the orchestration layer lacks sophistication, the model will assist in breaking systems one individually innocent step at a time."
> "Google shows the destination. Vercel shows the starting point. Claude Code shows why security cannot be compromised."
> "A malicious actor needs no jailbreak if they can construct an orchestration system that decomposes harmful tasks into benign-looking components."

## Cross-References
- **Related to:** AI bets 2026 (Y variable/harnessing layer = orchestration), Three structural shifts (AI reviewing AI, exception handling), Prompt lifecycle (Stage 5/6 workflow construction)
- **Builds on:** Orchestration-first thinking connects to constraint enforcement pattern
- **Contradicts:** N/A

## Personal Relevance (Doug-specific)
- **Applies to:** PAI agent system (PAIAGENTSYSTEM.md) aligns with Google's multi-agent vision. Vercel's filter applies to skill trigger design. Hook system provides orchestration layer.
- **Action items:**
  1. Apply Vercel's 5-point filter to PAI skill candidates
  2. Audit PAI agent delegation for orchestration guardrails (tool access, data access, budget)
  3. Consider agent identity management in PAI (which agents can invoke which tools)
  4. Review PAI security patterns against "decomposed harmful tasks" attack vector

## Extraction Quality
- **Confidence:** high
- **Gaps:** Google's full 50-page whitepaper not captured; Vercel's complete field report not detailed; Claude Code hack full breakdown not included; specific A2A and MCP protocol details not captured
