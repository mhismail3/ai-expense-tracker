import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  const { amount, vendor, category, ts } = await req.json();
  const { data, error } = await supabase.from('expenses').insert({ amount, vendor, category, ts });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data });
}
