# ChatGPT 201: Advanced Prompting Made Easy

**Original:** email-captures/2026-01-23_chatgpt-201-advanced-prompting-made-easy-easy-start-kit-prom.md
**Date:** 2025-11-05
**Type:** tutorial
**Tags:** advanced prompting, SMRPS framework, prompt techniques, self-correction, meta-prompting, reasoning scaffolds

## Core Thesis
The gap between mediocre and exceptional AI outputs isn't about which model you use—it's about how you structure your prompts. The right prompting strategy can extract performance from a smaller model that exceeds what a larger model produces with naive prompting. A five-tier framework (SMRPS) organizes 11 techniques that activate different reasoning modes in LLMs.

## Key Concepts
- **SMRPS Framework**: Smart Machines Require Proper Structure—Self-correction systems, Meta-prompting, Reasoning scaffolds, Perspective engineering, Specialized tactics.
- **Chain-of-Verification (CoVe)**: Multi-stage generation process: initial answer → enumerate potential errors → provide evidence for/against each → revise. Structured verification, not "double-check your work."
- **Context Splitting**: Breaking harmful operations into individually innocent tasks (used offensively in cyber attacks; needs defensive awareness).
- **Multi-Persona Debate**: Three experts with conflicting priorities argue, critique each other, then synthesize consensus. Forces explicit tradeoff analysis.
- **Summary-Expand Loop**: Compress context to 3 bullets, start fresh conversation, expand with full token budget for deep final analysis.

## Mental Models
- **Prompting as Interface Design**: The quality ceiling isn't determined by model capability—it's determined by how effectively you activate that capability through structured prompts.
- **Self-Correction Activation**: Models commit to reasoning paths and reinforce them. CoVe breaks this by structuring critique as a mandatory generation step.
- **Temperature Simulation via Roleplay**: Three passes—junior analyst (uncertain, exploratory), confident expert (decisive, direct), then synthesis. Simulates reasoning diversity without API controls.

## Predictions/Bets
- **Interface layer is the bottleneck**: Most AI failures are interface problems, not model problems. Structured prompting can extract 3-5x more value from the same models.
- **Prompting as core competency**: People who treat prompting as throwaway text leave most value on the table.

## Tools & Products Mentioned
| Tool | Category | Nate's Take |
|------|----------|-------------|
| Chain-of-Verification | Technique | For high-stakes tasks—legal, financial, security review—where mistakes have real consequences |
| Adversarial Prompting | Technique | Forces model to find 5 problems even in strong outputs; stress-tests conclusions |
| Reverse Prompting | Technique | Let model design the optimal prompt, then execute it. Exploits meta-knowledge about prompting |
| Recursive Prompt Optimization | Technique | Three-iteration improvement: constraints → ambiguities → depth. For building reusable prompts |
| Multi-Persona Debate | Technique | Surface competing priorities (CFO vs CISO vs VP Engineering). For complex decisions with tradeoffs |
| Summary-Expand Loop | Technique | Manage context window limits. Compress history, start fresh, expand with freed tokens |

## Prompts/Resources Included
- **11 Copy-Paste Templates**: Chain-of-Verification, Adversarial Prompting, Strategic Edge Case Learning, Reverse Prompting, Recursive Prompt Optimization, Deliberate Over-Instruction, Zero-Shot Chain of Thought Through Structure, Reference Class Priming, Multi-Persona Debate, Temperature Simulation Through Roleplay, Summary-Expand Loop
- **Decision Framework**: When to use what technique based on task type (accuracy, depth, tradeoffs, context limits, reusability)

## Quotable Lines
> "AI is the rare tool where 10x power for super-users is not an exaggeration."
> "The right prompting strategy can extract performance from a smaller model that exceeds what a larger model produces with naive prompting."
> "You're not teaching the model new skills—you're providing the scaffolding that lets it apply the skills it already has."
> "The shift from treating LLMs like search engines to treating them like reasoning systems that need structured activation determines whether AI becomes a transformational tool or an expensive disappointment."

## Cross-References
- **Related to:** Goldilocks prompting (right altitude), Prompt lifecycle (Stage 2 authoring), Y variable (structured interface layer)
- **Builds on:** Prompt-as-code philosophy, interface design over model selection
- **Contradicts:** N/A

## Personal Relevance (Doug-specific)
- **Applies to:** PAI prompting patterns—SMRPS framework provides categorization for prompt library. Multi-persona debate pattern applicable to Council skill. Summary-expand loop relevant for long-running skill sessions.
- **Action items:**
  1. Add SMRPS categorization to PAI prompt library
  2. Implement CoVe pattern in critical validation workflows
  3. Build multi-persona debate template for architectural decisions
  4. Add summary-expand pattern to long-running skill documentation

## Extraction Quality
- **Confidence:** high
- **Gaps:** 13-minute video content not fully captured; companion guide specifics behind paywall; specific prompt template text not included
