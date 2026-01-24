# Why "Pretty Good on First Pass" Is Costing You Thousands

**Source:** [Nate B Jones](https://www.youtube.com/watch?v=iG_CCjdyeX0)
**Date:** January 2026
**Duration:** 13:40
**Status:** To Review

## Core Thesis

The Ralph Wiggum plugin reveals a fundamental insight: we've been letting models decide when they're "done" instead of forcing them to confront reality through continuous evaluation.

## The Problem

- Models say "I'm helping" when they're not (like Ralph Wiggum)
- Models export "done" when they haven't finished
- They're wired to emit helpful responses - "done" seems helpful in the moment
- Model isn't thinking past that moment

## The Ralph Wiggum Solution

Created by Jeffrey Huntley (Australian developer)

**How it works:**
1. It's a **stop hook loop**
2. Whenever Claude says "done", Ralph prevents the stop
3. Reinjects the original prompt with updated file state
4. Forces model to confront reality each iteration
5. Keeps looping until task is *actually* complete

**Key insight:** Don't let the model decide when it's done. Make evaluations the steering wheel, not just the final test.

## When It Works Best

✅ Works well:
- Binary completion criteria (tests pass, file exists, function works)
- Technically precise definitions of "done"
- Measurable outcomes

❌ Works less well:
- Subjective quality ("make it professional")
- Creative tasks with fuzzy endpoints
- Tasks where "better" has no ceiling

## The Paradigm Shift

**Traditional eval:** Grade output at the end, score it, move on
**New paradigm:** Force-feed evaluations throughout every iteration, don't accept initial outputs, push until you get what you want

## Key Quote

> "Ralph doesn't make the model smarter. It makes the evaluator more autonomous and powerful in the system."

## Technical Implementation

```
Stop Hook → Prevent termination → Reinject prompt → Check reality → Loop
```

Each iteration sees:
- Modified files from previous runs
- Full history of attempts
- Original prompt (unchanged)

## PAI Implementation Ideas

1. **Create a persistence hook** - similar to Ralph but PAI-native
2. **Define binary success criteria** in task descriptions
3. **Build evaluation checkpoints** into complex workflows
4. **Track completion confidence** vs actual completion

---

## Personal Notes

*[Space for your observations]*

## Action Items

- [ ] Research Ralph Wiggum plugin implementation
- [ ] Design PAI-native completion verification hook
- [ ] Define measurable "done" criteria for common tasks
