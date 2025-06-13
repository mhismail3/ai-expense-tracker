# PBI-5 SMS/Telegram PRD

## 1. Summary
Allow expense entry and answers via SMS and Telegram messages.

## 2. Problem
Some users prefer messaging apps over web UI.

## 3. Proposed Solution
Connect Twilio webhook and Telegram bot to the same parsing and chat APIs.

## 4. User Stories
- As a user I text "spent $10" and it records

## 5. Requirements
- Twilio webhook endpoint
- Simple Telegram bot with polling

## 6. Non-Requirements
- Advanced bot features

## 7. Data Schema
- Reuse `expenses` table

## 8. Test Strategy
- Integration: send sample webhook payloads
- E2E: user flows via SMS

## 9. Acceptance Criteria
- Expenses can be logged via SMS and Telegram
