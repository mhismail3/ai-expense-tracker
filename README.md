# ChatSpend

ChatSpend is a chat-based expense tracker built with Next.js and Supabase.

## Setup

1. Copy `.env.example` to `.env` and set Supabase credentials and `OPENAI_API_KEY`.
2. Run `npm install`.
3. Run `psql < scripts/setup.sql` in Supabase SQL editor to create tables.
4. Start dev server with `npm run dev` and visit `/signup` to create an account.
5. Try the expense parser by sending a POST to `/api/parse` with `{ "text": "Spent $5 on coffee" }` or use the `/chat` page. End your message with a question mark to receive insights, or call `/api/chat` directly with `{ "userId": "<id>", "question": "How much on coffee?" }`.
6. Run `npm test` to execute unit tests.