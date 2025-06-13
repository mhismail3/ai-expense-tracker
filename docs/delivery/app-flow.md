# App Flow

1. **User Sign Up/Login** via Supabase auth.
2. **Enter Expense** through chat UI or SMS/Telegram.
3. **API /parse** sends text to OpenAI, returns structured expense.
4. **Store Expense** in Supabase.
5. **User Asks Question** like "coffee spend?" via chat.
6. **API /chat** queries recent expenses and calls OpenAI for summary.
7. **Display Answer** in chat UI or send via SMS/Telegram.
8. **User Reviews History** in web dashboard listing expenses.
