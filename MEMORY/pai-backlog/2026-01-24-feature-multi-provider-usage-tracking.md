# Multi-Provider Usage Tracking (OpenAI + Gemini)

**Added:** 2026-01-24
**Category:** feature
**Priority:** low
**Preconditions:** Active API keys for OpenAI and/or Google Gemini

## Context

After implementing live Anthropic/Claude usage tracking in the observability dashboard (showing 5-hour and weekly quota utilization), discussion arose about extending this to other AI providers. Currently the dashboard only tracks Claude Code quota.

## The Idea

Add usage panels for OpenAI and Google Gemini to the observability dashboard, similar to the existing Claude usage panel.

### OpenAI
- **API:** `https://api.openai.com/v1/organization/usage` or `/dashboard/billing/usage`
- **Auth:** Requires API key with organization permissions
- **Metrics:** Monthly credit balance, usage by model, spend rate
- **Note:** Credit-based billing (not rolling windows like Claude)

### Google Gemini
- **API:** Google AI Studio rate limits or Vertex AI quotas
- **Auth:** API key or GCP service account
- **Metrics:** Requests per minute/day, tokens used
- **Note:** Rate-limited rather than quota-percentage based

## Implementation Notes

1. Add API key configuration to PAI settings or environment
2. Create `/api/usage/openai` and `/api/usage/gemini` endpoints
3. Design unified gauge component that handles different billing models
4. Consider polling frequency (OpenAI/Gemini may have stricter rate limits)

## Expected Value

- **Unified view** of all AI provider usage in one dashboard
- **Cost awareness** across providers
- **Capacity planning** - see which provider has headroom

## When to Revisit

- When actively using OpenAI or Gemini APIs alongside Claude
- When multi-provider workflows become common in PAI
- When cost optimization across providers becomes a priority
