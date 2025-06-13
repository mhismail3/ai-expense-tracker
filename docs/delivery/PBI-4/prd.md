# PBI-4 Insights PRD

## 1. Summary
Provide expense summaries and answers via OpenAI using conversation context.

## 2. Problem
Users want quick insights on their spending patterns.

## 3. Proposed Solution
Implement `/api/chat` that aggregates user expenses and calls OpenAI `summariseExpenses`.

## 4. User Stories
- As a user I ask "How much on coffee?" and get a number for this month.

## 5. Requirements
- Query last 30 days expenses by category
- Format answer as friendly text

## 6. Non-Requirements
- Predictive budgeting

## 7. Data Schema
- Reuse `expenses` table

## 8. Test Strategy
- Unit: query functions
- Integration: API call with sample data

## 9. Acceptance Criteria
- Response accuracy within 10% on seeded data
