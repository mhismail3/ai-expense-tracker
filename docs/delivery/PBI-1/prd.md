# PBI-1 Auth/DB PRD

## 1. Summary
Implement Supabase auth and PostgreSQL schema to store user and expense data.

## 2. Problem
Users need secure login and data persistence.

## 3. Proposed Solution
Use Supabase email/password auth. Create tables `users` and `expenses`.

## 4. User Stories
- As a user I can sign up and log in.
- As a user I can see my expenses only.

## 5. Requirements
- Supabase project configured
- `expenses` table with amount, vendor, category, timestamp, user_id

## 6. Non-Requirements
- OAuth providers

## 7. Data Schema
- `users(id, email, created_at)`
- `expenses(id, user_id, amount, vendor, category, ts)`

## 8. Test Strategy
- Unit: DB schema tests
- Integration: Sign up/login flow

## 9. Acceptance Criteria
- Sign up/login works
- Expenses saved and retrieved per user
