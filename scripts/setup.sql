-- Supabase schema for ChatSpend
create table if not exists expenses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  amount numeric not null,
  vendor text,
  category text,
  ts timestamptz default now()
);
