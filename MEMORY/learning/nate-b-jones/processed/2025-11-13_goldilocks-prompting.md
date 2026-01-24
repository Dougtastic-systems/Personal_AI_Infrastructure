# Goldilocks Prompting: Right-Altitude Prompts for 10x Output

**Original:** email-captures/2026-01-23_10x-your-prompt-power-with-a-100-word-prompt-how-to-build-go.md
**Date:** 2025-11-13
**Type:** prompt-kit
**Tags:** Goldilocks prompting, prompt engineering, AI slop, model defaults, right altitude, anti-convergence

## Core Thesis
Goldilocks prompting is not about length—it's about deciding how much freedom your AI gets to make its own decisions. Short prompts (~500 tokens) that give the model enough context to understand the goal plus good/bad examples, then letting it work with bounded freedom, produce better results 80% of the time than either vague prompts or exhaustive specifications.

## Key Concepts
- **Prompt Altitude**: Too short = AI has too much freedom, produces generic output. Too long = kills creativity, encodes brittleness. Middle-sized = clear boundaries with room for model judgment.
- **Pattern Naming**: Write "Tailwind purple/blue defaults" not "#6366f1"—model recognizes pattern family, not just specific instance.
- **Categorical Examples**: Show what categories feel like through concrete examples. "Code aesthetic: JetBrains Mono, Fira Code, Space Grotesk" shows a space without constraining to only those options.
- **Decision Heuristics**: "70% dominant, 20% supporting, 10% accent"—formulas that require judgment to apply, not lookup tables.
- **Second-Order Convergence Warnings**: After following guidance, model will find new defaults. Warn about where it will converge next (told to avoid purple → converges to teal).

## Mental Models
- **Freedom as Control Parameter**: Goldilocks prompts shape how much freedom the AI gets. Most valuable work happens when model has bounded creative space.
- **Stackable Lego Bricks**: These prompts can combine (layout + color + typography together) because each operates at right altitude with principles/heuristics, not procedures.
- **20/80 Split**: 80% of cases need Goldilocks prompts (model exercises judgment). 20% need deterministic, heavily specified prompts (multi-agent systems, structured outputs for downstream processing).

## Predictions/Bets
- **AI Slop is Steering Failure**: Most "AI slop" critique is really about not steering models right. Models are steerable—we just haven't learned how.
- **Goldilocks Prompts > Long Prompts**: Middle-sized prompts harder to write but produce more creative results because they teach the model how to think, not what to do.

## Tools & Products Mentioned
| Tool | Category | Nate's Take |
|------|----------|-------------|
| Goldilocks Prompt Builder | Meta-prompt | Interviews you and helps build a Goldilocks prompt with best practices |
| 10 Domain Prompts | Templates | Color & Palettes, Layout & Composition, Direct Prose, Clear Documentation, Storytelling, Business Narratives, Clear Visualizations, Strategic Analysis, Task-Oriented Flows, Pragmatic Systems |
| Anthropic Context Engineering Blog | Reference | Shows good/bad/ugly prompt examples that inspired Goldilocks principles |

## Prompts/Resources Included
- **7 Goldilocks Principles**: (1) Name patterns rather than instances, (2) Use categorical examples, (3) Give decision heuristics not rules, (4) Calibrate through contrast/comparison, (5) Use action directives not procedures, (6) Create forbidden lists anchoring avoidance, (7) Warn about second-order convergence
- **10 Anti-Slop Prompts**: Each <500 tokens, targeting specific model default flaws
- **Clear Visualizations Example Prompt**: Full template with forbidden list, chart choices by purpose, annotation principles

## Quotable Lines
> "Goldilocks prompting is not about length. It's about deciding how much space your AI gets to make its own decisions."
> "If you write a long prompt, you can kill the creativity. A short one can leave the model too much space."
> "The model is smart. Give it good heuristics and get out of the way."
> "These models are steerable! A lot of the 'AI slop' critique is really about us not being able to steer the models right."

## Cross-References
- **Related to:** ChatGPT 201 (complementary—structural techniques vs altitude tuning), Prompt lifecycle (Stage 2 authoring optimization), Y variable (constraint without rigidity)
- **Builds on:** Extends Anthropic's context engineering principles with specific formula
- **Contradicts:** N/A (complements rather than contradicts long-form specification)

## Personal Relevance (Doug-specific)
- **Applies to:** PAI skill design—skills should operate at Goldilocks altitude. Current skill prompts may be too verbose (killing creativity) or too sparse (causing convergence to defaults).
- **Action items:**
  1. Audit PAI skill prompts against 7 Goldilocks principles
  2. Add second-order convergence warnings to key skills
  3. Build Goldilocks prompt templates for PAI's visual/design workflows
  4. Identify which PAI skills need deterministic mode (20%) vs Goldilocks mode (80%)

## Extraction Quality
- **Confidence:** high
- **Gaps:** 12-minute video demo not captured; full text of all 10 domain prompts not included; Goldilocks Prompt Builder full template not captured
