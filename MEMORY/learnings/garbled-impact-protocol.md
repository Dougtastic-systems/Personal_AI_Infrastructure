# Garbled Impact Moment Protocol

**Captured:** 2026-01-10
**Context:** Discovered during Jasmine 12-30 review - Stara's "vote of confidence" quote had ambiguous attribution

---

## The Problem

**Garbled transcript + Compelling moment = High fabrication risk**

The more impactful the moment, the more likely we want to include it. But garbled transcripts around impactful moments are *exactly* where misattribution causes the most damage.

### Trust Destruction Pattern
- We amplify the wrong interpretation
- Participant remembers it differently
- "This system doesn't understand what happened. I can't trust it."

---

## Detection Rule

**FINDING TYPE:** `garbled_impact_moment`
**SEVERITY:** `review_required` (flag, don't block)

### Triggers when BOTH conditions met:

1. **Speaker attribution is ambiguous:**
   - Merged turns
   - Unclear boundaries
   - Multiple speakers in single block
   - Transcription artifacts mid-sentence

2. **AND content contains impact signals:**
   - Acknowledgment language: "thank you", "that's amazing", "vote of confidence"
   - Commitment language: "I will", "I'm going to", "I commit"
   - Insight language: "I realized", "I learned", "that landed"
   - Attribution to others: "what you said", "your framework", "you showed me"

---

## Output Format

```json
{
  "type": "garbled_impact_moment",
  "severity": "review_required",
  "location": "lines 685-695",
  "speakers_involved": ["Stara Shakti", "Jasmine Mahmoud"],
  "raw_text": "[full garbled section verbatim]",
  "ambiguity": "Turn boundary unclear - 'vote of confidence' attribution ambiguous",
  "possible_interpretations": [
    {
      "id": 1,
      "interpretation": "Stara telling Jasmine: group reaction validates Jasmine publishing her framework",
      "implication": "Ripple effect: group gave Jasmine permission to act"
    },
    {
      "id": 2,
      "interpretation": "Stara saying: Jasmine's work inspired Stara to publish her own content",
      "implication": "Ripple effect: Jasmine sparked action in Stara"
    }
  ],
  "safe_fallback": "The group responded enthusiastically to Jasmine's framework presentation.",
  "recommendation": "DO NOT QUOTE without human verification"
}
```

---

## Facilitator Review Document Section

```markdown
## ⚠️ Moments Requiring Human Verification

### Line 685-695: Attribution Ambiguity

**Raw transcript:**
> [exact garbled text here]

**The problem:** Turn boundaries unclear. Two possible meanings:

| # | Interpretation | If true, means... |
|---|----------------|-------------------|
| 1 | Stara → Jasmine: "The group just validated YOU to publish YOUR framework" | Ripple: group gave Jasmine permission |
| 2 | Stara → Jasmine: "Your work inspired ME to publish MY content" | Ripple: Jasmine sparked Stara's action |

**Action required:** Select interpretation or mark for omission

☐ Interpretation 1
☐ Interpretation 2
☐ Omit from final email

**Safe alternative (if omitting quote):**
> "The group responded enthusiastically to Jasmine's framework presentation."
```

---

## Resolution Tracking

When facilitator resolves a flagged moment, capture:

```json
{
  "flag_id": "garble-20251230-685",
  "resolved_by": "Doug Snyder",
  "resolved_at": "2026-01-11T...",
  "resolution": "interpretation_1" | "interpretation_2" | "omit" | "custom",
  "custom_text": "[if custom resolution]",
  "notes": "[facilitator reasoning]",
  "confidence": "certain" | "best_guess"
}
```

This builds a correction corpus for learning:
- Frequency of garble issues by session
- Which interpretation types are usually correct
- Whether omission or custom rewrites work better

---

## Rules

1. **Garble + Impact = Flag, Don't Guess**
2. **Provide raw + both interpretations** - facilitator chooses
3. **Offer safe fallback** - factual observation without attribution
4. **Never amplify ambiguous quotes** without human sign-off
5. **Track resolutions** - breadcrumbs for learning

---

## Open Questions (iterate after more data)

- Is omission or rewrite more effective for trust?
- How frequent are garbled impact moments? (hoping edge case)
- Can we detect patterns in which interpretation is usually right?
