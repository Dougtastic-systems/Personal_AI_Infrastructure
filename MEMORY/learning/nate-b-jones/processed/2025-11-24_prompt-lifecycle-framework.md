# The Prompt Lifecycle: A Framework for Systematic Prompting

**Original:** email-captures/2025-11-24_prompting-is-too-hard-check-out-my-easy-prompt-lifecycle-gui.md
**Date:** 2025-11-24
**Type:** framework
**Tags:** prompting, intent formation, tooling, prompt engineering, workflow

## Core Thesis
Prompting fails most often not because of poor wording, but because of unclear intent—we lack a shared language for the stages of prompt work. The six-stage prompt lifecycle reveals that Stage 1 (Intent Formation) is critically underserved by tooling, yet it's where most prompt failures originate.

## Key Concepts
- **Intent Formation**: The process of translating fuzzy goals into structured requirements before any wording happens. Not about words—about defining the task precisely enough for reliable model execution.
- **Prompt Lifecycle**: A six-stage framework: (1) Intent Formation, (2) Authoring/Drafting, (3) Storage/Versioning, (4) Evaluation/Testing, (5) Workflow Construction, (6) Production Deployment.
- **Specification vs. Thinking**: Intent formation masquerades as thinking but is actually specification work that benefits from tooling.
- **Testable Intent**: The ability to write specifications that enable automated review—not "write something good" but constraints that can be verified.

## Mental Models
- **Prompt Lifecycle Framework**: Diagnostic tool for identifying where prompt work breaks down. When something isn't working: unclear goal = Stage 1, messy wording = Stage 2, reliability drifting = Stage 4, execution failing = Stage 5/6.
- **Tooling Distribution Map**: Most tooling (19 tools mapped) serves Stages 2-6; Stage 1 is nearly empty. This explains why practitioners use drafting tools for intent problems.

## Predictions/Bets
- **Intent tooling gap**: The missing Stage 1 tooling represents a major opportunity. Current practitioners are using drafting tools to solve intent problems, which doesn't work.

## Tools & Products Mentioned
| Tool | Category | Nate's Take |
|------|----------|-------------|
| HeyPresto | Intent Formation | Built to address Stage 1 gap—expands vague input into structured prompts |
| OpenAI Playground | Authoring | Developer-focused with parameter controls |
| PromptPerfect | Authoring | Auto-refines wording, cross-model testing |
| Promptmetheus | Authoring/Storage | Modular prompt IDE with blocks structure |
| Cursor | Authoring | AI-first code editor with integrated prompting |
| Lovable | Authoring | Natural language to full-stack web apps |
| PromptLayer | Storage/Production | Prompt CMS with versioning and monitoring |
| PromptTools | Evaluation | Open-source testing and experimentation |
| LangChain | Workflow | Framework for chaining prompts with tools |
| LangSmith | Evaluation/Production | Tracing and debugging for LangChain |

## Prompts/Resources Included
- **Prompt Lifecycle Assessment Prompt**: Diagnostic tool that transforms LLM into consultant, assessing habits against six-stage framework to identify bottlenecks
- **HeyPresto discount**: 70% off forever with code HEYPRESTOSUBSTACKSPECIAL

## Quotable Lines
> "Every downstream failure in prompt engineering begins as an upstream failure of intent."
> "Prompting is the art of figuring out how to talk to an alien intelligence."
> "The problem isn't your words. It's that you haven't figured out what you actually want."

## Cross-References
- **Related to:** Three structural shifts (specification literacy), Claude Skills (skill descriptions as intent specifications)
- **Builds on:** Prompt-as-code philosophy
- **Contradicts:** N/A

## Personal Relevance (Doug-specific)
- **Applies to:** PAI skill system—every SKILL.md file is essentially a Stage 1 intent specification. The prompt lifecycle validates PAI's approach of structured skill definitions.
- **Action items:**
  1. Evaluate PAI skills against the six-stage framework
  2. Consider adding a "skill-intent-clarifier" tool that helps formalize Stage 1 for new skills
  3. Use the diagnostic checklist when debugging skill trigger failures

## Extraction Quality
- **Confidence:** high
- **Gaps:** The 17-minute video content not captured; specific HeyPresto features and demos not detailed
