---
capture_type: LEARNING
timestamp: 2026-01-24 09:27:36 PST
auto_captured: true
tags: [auto-capture]
---

# Quick Learning: Designed three-agent extraction pipeline with extractor, validator, and adjudicator for quality-verified batch processing.

**Date:** 2026-01-24
**Auto-captured:** Yes (use /capture-learning for detailed narrative)

---

## Summary

Designing three-agent extraction pipeline with verification loop for Nate email processing

## Analysis

This is a classic "maker-checker-resolver" pattern. Here's the architecture:

## Actions Taken

Designed three-agent pipeline with verification loop

## Results

Complete architecture for maker-checker-resolver pattern

## Current Status

Ready to implement. Want me to build the actual agent prompts and orchestration script?

## Next Steps

1. Build the three agent prompt files

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

📋 SUMMARY: Designing three-agent extraction pipeline with verification loop for Nate email processing

🔍 ANALYSIS: This is a classic "maker-checker-resolver" pattern. Here's the architecture:

## Three-Agent Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  EXTRACTOR  │────▶│  VALIDATOR  │────▶│ ADJUDICATOR │
│   Agent 1   │     │   Agent 2   │     │   Agent 3   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
   draft.json      validation.json      final.json
                   (issues found?)      (resolved)
```

---

## Agent 1: EXTRACTOR

**Input:** Source email markdown
**Output:** `{email-id}-draft.json`

**Prompt Core:**
```
You are extracting structured knowledge from a Nate B. Jones newsletter.
Read the email and produce a JSON following this exact schema: [schema]

Focus on:
- Mental models Nate uses to derive his assertions
- Claims with their reasoning and evidence type
- How this changes how people work
- Explicit practices (only if numbered in source)

Attribution requirements:
- source_file: exact filename
- date_sent: actual send date from email
- Every person/company/tool needs context and concept_attributed
```

---

## Agent 2: VALIDATOR

**Input:** Source email + draft.json
**Output:** `{email-id}-validation.json`

**Validation Checklist:**
```json
{
  "email_id": "2026-01-21-specification-gap",
  "validation_timestamp": "2026-01-24T09:30:00Z",
  
  "attribution_check": {
    "source_file_exists": true,
    "source_file_matches": true,
    "date_sent_accurate": true,
    "subject_matches": true
  },
  
  "completeness_check": {
    "mental_models_captured": 5,
    "mental_models_in_source": 5,
    "missing_models": [],
    
    "assertions_captured": 6,
    "key_claims_in_source": 6,
    "missing_claims": [],
    
    "people_mentioned_captured": 2,
    "people_in_source": 2,
    "missing_people": [],
    
    "key_quotes_captured": 5,
    "notable_quotes_in_source": 6,
    "missing_quotes": ["quote text here"]
  },
  
  "accuracy_check": {
    "misattributed_concepts": [],
    "incorrect_dates": [],
    "wrong_company_context": [],
    "fabricated_content": []
  },
  
  "quality_scores": {
    "attribution": 10,
    "completeness": 9,
    "accuracy": 10,
    "overall": 9.7
  },
  
  "issues": [
    {
      "severity": "minor",
      "field": "quotes",
      "issue": "Missing quote: 'The system prompts you now.'",
      "recommendation": "Add to quotes array"
    }
  ],
  
  "verdict": "PASS_WITH_FIXES" // PASS | PASS_WITH_FIXES | FAIL_NEEDS_REWORK
}
```

**Prompt Core:**
```
You are a quality validator for knowledge extraction.
You have: (1) the source email, (2) the extracted JSON.

Your job is NOT to re-extract. Your job is to VERIFY:

1. ATTRIBUTION CHECK
   - Does source_file match the actual filename?
   - Is date_sent correct?
   - Does subject match?

2. COMPLETENESS CHECK
   - Read the source email carefully
   - Count mental models, assertions, people, companies, tools
   - Identify anything IMPORTANT that was missed
   - "Important" = would change understanding of Nate's argument

3. ACCURACY CHECK
   - Are concepts attributed to the right people?
   - Are company descriptions accurate?
   - Is any content fabricated (not in source)?

4. PRODUCE VALIDATION JSON with scores and issues

Verdicts:
- PASS: Score 9.5+, no issues
- PASS_WITH_FIXES: Score 8+, minor issues listed
- FAIL_NEEDS_REWORK: Score <8 or major issues
```

---

## Agent 3: ADJUDICATOR

**Input:** draft.json + validation.json
**Output:** `{email-id}-final.json` OR escalation to human

**Decision Logic:**
```
IF verdict == "PASS":
    copy draft.json → final.json
    
ELIF verdict == "PASS_WITH_FIXES":
    FOR each issue in validation.issues:
        IF severity == "minor":
            apply fix automatically
        ELIF severity == "major":
            flag for human review
    produce final.json with fixes applied
    
ELIF verdict == "FAIL_NEEDS_REWORK":
    escalate to human with:
        - draft.json
        - validation.json
        - specific failure points
```

**Prompt Core:**
```
You are the adjudicator resolving extraction quality issues.
You have: (1) draft extraction, (2) validator's report.

Your job:
1. If PASS: Output the draft as final
2. If PASS_WITH_FIXES: Apply each minor fix, output corrected final
3. If FAIL: Produce escalation report for human review

When applying fixes:
- Add missing quotes exactly as validator identified
- Add missing people/companies with minimal context
- Do NOT re-interpret or expand—just fix what validator found

Output: final.json (or escalation.json if FAIL)
```

---

## Orchestration Flow

```typescript
async function processEmail(emailPath: string) {
  const emailId = extractId(emailPath);
  
  // Stage 1: Extract
  const draft = await runAgent("Extractor", {
    input: emailPath,
    output: `${emailId}-draft.json`
  });
  
  // Stage 2: Validate
  const validation = await runAgent("Validator", {
    inputs: [emailPath, draft],
    output: `${emailId}-validation.json`
  });
  
  // Stage 3: Adjudicate
  if (validation.verdict === "FAIL_NEEDS_REWORK") {
    await escalateToHuman(emailId, draft, validation);
    return { status: "escalated", emailId };
  }
  
  const final = await runAgent("Adjudicator", {
    inputs: [draft, validation],
    output: `${emailId}-final.json`
  });
  
  // Stage 4: Archive drafts, keep final
  await archiveDrafts(emailId);
  
  return { status: "complete", emailId, score: validation.quality_scores.overall };
}

// Batch orchestration
async function processAllEmails(emails: string[]) {
  const results = [];
  const escalations = [];
  
  for (const email of emails) {
    const result = await processEmail(email);
    if (result.status === "escalated") {
      escalations.push(result);
    } else {
      results.push(result);
    }
  }
  
  return { 
    completed: results.length,
    escalated: escalations.length,
    avgScore: average(results.map(r => r.score))
  };
}
```

---

## Directory Structure During Processing

```
nate-extraction-test/
├── processing/
│   ├── 2026-01-21-specification-gap-draft.json
│   ├── 2026-01-21-specification-gap-validation.json
│   └── 2026-01-21-specification-gap-final.json
├── completed/
│   └── 2026-01-21-specification-gap.json  (renamed final)
├── escalations/
│   └── 2026-01-18-visual-ai-blind-spot.json  (needs human)
└── archive/
    └── drafts/  (old drafts for audit trail)
```

---

⚡ ACTIONS: Designed three-agent pipeline with verification loop

✅ RESULTS: Complete architecture for maker-checker-resolver pattern

📊 STATUS: Ready to implement. Want me to build the actual agent prompts and orchestration script?

➡️ NEXT: 
1. Build the three agent prompt files
2. Create orchestration script
3. Test on one email end-to-end
4. Run on all 117

📖 STORY EXPLANATION:
1. Extractor agent reads email and produces draft JSON
2. Validator agent compares draft against source for accuracy and completeness
3. Validator scores attribution, completeness, accuracy and renders verdict
4. Adjudicator applies minor fixes automatically or escalates failures
5. Final JSON moves to completed folder, drafts archived
6. Human only sees escalations requiring judgment calls
7. This catches missing quotes, misattributed concepts, fabricated content
8. Three-agent separation prevents single-point-of-failure in extraction quality

⭐ RATE (1-10):

🗣️ NeonBrain: Designed three-agent extraction pipeline with extractor, validator, and adjudicator for quality-verified batch processing.

</details>
