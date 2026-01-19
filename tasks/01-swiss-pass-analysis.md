# Task 01: Swiss Travel Pass Analysis

## Objective
Create a comprehensive Swiss Travel Pass cost analysis document that helps Ray and Katie decide whether to purchase the pass.

## Input Files
- `@data/pricing.json` — All pass pricing and activity costs
- `@data/bookings.json` — Trip dates and confirmed activities
- `@data/itinerary-skeleton.json` — Day-by-day structure

## Output
- **Filename:** `outputs/Swiss_Pass_Analysis.md`
- **Format:** Markdown (can be converted to PDF later)

## Document Structure

### 1. Executive Summary (2-3 sentences)
- Clear recommendation: BUY or SKIP the pass
- One-line reasoning

### 2. Pass Options
Table comparing:
- Swiss Travel Pass 8-day (CHF 878 for 2)
- Swiss Half Fare Card (CHF 300 for 2)
- Point-to-point tickets

### 3. What's Covered
List from `pricing.json`:
- FREE with pass (trains, boats, Rigi, museums)
- 50% off (First, Pilatus, Titlis)
- 25% off (Jungfraujoch)
- No discount (First Flyer/Glider)

### 4. Cost Scenarios

**Build three scenarios from `pricing.json` passAnalysisScenarios:**

#### Scenario A: Minimal
Only confirmed activities + required transport
- List each item with full price vs. pass price
- Calculate totals

#### Scenario B: Moderate  
Adds Museum of Transport, lake cruise, First Gondola
- List additional items
- Calculate totals

#### Scenario C: Comprehensive
Adds Jungfraujoch
- List additional items
- Calculate totals

### 5. Break-Even Analysis
Table showing:
| Scenario | Without Pass | With Pass | Pass Cost | Net Savings |
|----------|--------------|-----------|-----------|-------------|

### 6. Flexibility Value Discussion
- What if weather forces changes?
- Value of spontaneous boat/train rides
- Is ~CHF 200-500 premium worth the freedom?

### 7. Final Recommendation
- Clear verdict with reasoning
- If SKIP: Note the Half Fare Card as alternative (50% off everything for CHF 300)

## Style Guidelines
- Use actual numbers from the JSON files
- Show your math
- Be direct — no hedging
- Tables for comparisons
- No fluff paragraphs

## Verification Checklist
Before finishing:
- [ ] All prices match `pricing.json`
- [ ] Calculations are correct
- [ ] Recommendation is clear and justified
