'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Expense {
  amount: number;
  vendor: string | null;
  category: string | null;
  ts: string;
}

export default function HistoryPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) return;
      const { data } = await supabase
        .from('expenses')
        .select('amount,vendor,category,ts')
        .eq('user_id', user.id)
        .order('ts', { ascending: false });
      if (data) setExpenses(data as Expense[]);
    }
    load();
  }, []);

  return (
    <main>
      <h1>Expense History</h1>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Vendor</th>
            <th>Category</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.ts + exp.vendor}>
              <td>{exp.amount}</td>
              <td>{exp.vendor}</td>
              <td>{exp.category}</td>
              <td>{new Date(exp.ts).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
