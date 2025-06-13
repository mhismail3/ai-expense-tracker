'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Expense {
  amount: number;
  vendor: string;
  category?: string;
  ts?: string;
}

export default function HistoryPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('expenses')
        .select('amount,vendor,category,ts')
        .limit(20);
      setExpenses(data || []);
    }
    load();
  }, []);

  return (
    <main className="app-container">
      <nav className="sidebar">
        <a href="/chat">Chat</a>
      </nav>
      <section className="content">
        <h1>History</h1>
        <ul>
          {expenses.map((e, i) => (
            <li key={i}>
              {e.ts || ''} - {e.vendor} ${e.amount}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
