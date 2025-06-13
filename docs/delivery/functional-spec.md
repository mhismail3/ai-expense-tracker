# Functional Specification

## Core Logic
1. Next.js API routes handle user requests.
2. Expenses stored in Supabase `expenses` table keyed by user id, amount, vendor, category, timestamp.
3. Auth via Supabase session cookies.
4. NLP parse via OpenAI function call: `parseExpense(text)` returns structured data.
5. Insights query uses OpenAI function `summariseExpenses(userId, question)` referencing recent spend data.

## External APIs
- **OpenAI** for NLP and chat completions.
- **Supabase** REST and auth APIs.
- **Twilio** webhook for SMS; simple Telegram bot for messages.

## LLM Calls
- Expenses: `POST /api/parse` -> OpenAI -> JSON result.
- Chat: `POST /api/chat` -> OpenAI -> natural language answer.

## Error Handling
- Validate parsed amounts and dates.
- Rate limit chat endpoints to prevent abuse.

