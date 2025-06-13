import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { openai } from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { userId, question } = await req.json();
  const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: expenses, error } = await supabase
    .from('expenses')
    .select('amount,vendor,category,ts')
    .eq('user_id', userId)
    .gte('ts', from);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    messages: [
      { role: 'system', content: 'Answer questions about these expenses' },
      { role: 'assistant', content: JSON.stringify(expenses) },
      { role: 'user', content: question },
    ],
  });
  const content = completion.choices[0].message?.content || '';
  return NextResponse.json({ data: content });
}
