# PBI-3 Chat UI PRD

## 1. Summary
Build responsive chat interface using Next.js and components from the frontend spec.

## 2. Problem
Users need a simple chat screen to log and query expenses.

## 3. Proposed Solution
Create `ChatPage` with message list and input bar, connect to API routes.

## 4. User Stories
- As a user I can send a message and see the bot reply.

## 5. Requirements
- Message list autoscroll
- Input bar with send on Enter

## 6. Non-Requirements
- Rich text formatting

## 7. Data Schema
- Messages stored in memory per session for now

## 8. Test Strategy
- Unit: component render
- Integration: message flow with mocked API

## 9. Acceptance Criteria
- Chat works on mobile and desktop
