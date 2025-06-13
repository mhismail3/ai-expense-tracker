# ChatSpend

ChatSpend is a chat-based expense tracker built with Next.js and Supabase.

## Setup

1. Copy `.env.example` to `.env` and set Supabase credentials and `OPENAI_API_KEY`.
2. Run `npm install`.
3. Run `psql < scripts/setup.sql` in Supabase SQL editor to create tables.
4. Start dev server with `npm run dev` and visit `/signup` to create an account.
