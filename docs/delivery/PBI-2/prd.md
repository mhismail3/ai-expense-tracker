# PBI-2 Expense NLP PRD

## 1. Summary
Parse natural language expense entries using OpenAI functions.

## 2. Problem
Users want quick entry without manual fields.

## 3. Proposed Solution
Send text to OpenAI `parseExpense` function returning amount, vendor, category, timestamp.

## 4. User Stories
- As a user I can type "Spent $5 on coffee" and it records correctly.

## 5. Requirements
- Endpoint `/api/parse` calling OpenAI
- Validation and error handling

## 6. Non-Requirements
- Custom ML models

## 7. Data Schema
- Reuse `expenses` table

## 8. Test Strategy
- Unit: parser result mapping
- Integration: API call hitting OpenAI mock

## 9. Acceptance Criteria
- Text expenses saved with correct fields >=90% in tests
