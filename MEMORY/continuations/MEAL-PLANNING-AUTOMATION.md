# Meal Planning Automation Project

## Context
Symbiotic project connecting finances, health, and time optimization. Currently using Ralphs curbside pickup. Need to understand cost vs. convenience tradeoffs.

---

## Project Goals

1. **Reduce decision friction** - Eliminate "what's for dinner?" stress
2. **Optimize grocery spend** - Track per-meal costs, identify savings
3. **Save time** - Automate planning, list generation, ordering
4. **Improve nutrition** - Consistent, balanced meals
5. **Family coordination** - Preferences, schedules, dietary needs

---

## Current State (To Gather)

### Household Profile
- [ ] Family size / who's eating at home
- [ ] Who does cooking (Doug, Melissa, shared?)
- [ ] Dietary restrictions / allergies
- [ ] Cuisine preferences / favorites
- [ ] Foods to avoid

### Current Spending (From Statements)
- Costco: Bulk staples
- Trader Joe's: Specialty items
- Ralphs: Regular groceries (curbside)
- Dining Out: $200-400/mo

### Current Pain Points
- [ ] Meal decision fatigue?
- [ ] Shopping frequency?
- [ ] Food waste?
- [ ] Budget concerns?
- [ ] Time constraints?

---

## Tradeoff Analysis: Cost vs. Convenience

### Ralphs Curbside Pickup

| Factor | Analysis |
|--------|----------|
| **Service Fee** | $X per order (need to check) |
| **Time Saved** | ~45-60 min/trip (driving + shopping + checkout) |
| **Impulse Savings** | Reduced unplanned purchases |
| **Price Comparison** | Can't comparison shop in-store |
| **Product Quality** | No control over produce selection |
| **Availability** | Sometimes substitutions or out-of-stock |

### Cost-Benefit Framework
```
Time Value = (Hours saved × Your hourly value) - Service fees
            + Impulse purchase savings
            - Price premium (if any)
            - Substitution quality loss
```

### Questions to Answer
1. What's the Ralphs pickup fee per order?
2. How many trips per month?
3. What's an hour of your time worth? (opportunity cost)
4. How much do you typically impulse-buy in-store?

---

## Spec Process Outline

### Phase 1: Discovery & Data Collection
- [ ] Interview household about preferences, constraints
- [ ] Audit current grocery receipts (Costco receipts in FinResearch)
- [ ] Document current meal rotation / favorites
- [ ] Identify Ralphs curbside actual costs
- [ ] Calculate true cost of in-store vs. pickup

### Phase 2: System Design
- [ ] Define meal categories (quick weeknight, batch cook, etc.)
- [ ] Create recipe database structure
- [ ] Design shopping list generation logic
- [ ] Plan store-specific list optimization (Costco vs Ralphs vs TJ's)
- [ ] Determine integration points (calendar, finances)

### Phase 3: Build & Test
- [ ] Create meal planning skill (`_MEALPLANNING`)
- [ ] Build recipe storage system
- [ ] Implement weekly menu generator
- [ ] Auto-generate shopping lists by store
- [ ] Track actual costs vs. planned

### Phase 4: Optimize
- [ ] Analyze spending patterns
- [ ] Identify cost-saving opportunities
- [ ] Refine based on family feedback
- [ ] Automate Ralphs order creation (if API exists)

---

## Capability Options

### Minimal Viable System
- Weekly meal calendar in markdown
- Manual shopping list generation
- Cost tracking in FINANCES

### Enhanced System
- Recipe database with ingredients/costs
- Auto-generated shopping lists grouped by store
- Nutritional tracking
- Leftover/batch cooking optimization

### Full Automation (Aspirational)
- AI-powered meal suggestions based on preferences
- Direct integration with Ralphs/Instacart API
- Pantry inventory tracking
- Automatic reordering of staples

---

## Integration Points

| System | Connection |
|--------|------------|
| **FINANCES** | Grocery category tracking, budget alerts |
| **Health/Nutrition** | Meal quality, macros, dietary goals |
| **Calendar** | Meal assignments, prep time blocking |
| **1Password** | Ralphs account credentials |

---

## Research Needed

1. **Ralphs API/Integration** - Can we automate orders?
2. **Recipe databases** - Open source options?
3. **Meal planning apps** - What exists? Build vs. use?
4. **Costco inventory** - Bulk buy optimization

---

## Start Here

Say: "Spec out meal planning" or "Start meal planning discovery"

I'll begin with the discovery interview to understand your household's specific needs and current pain points.
