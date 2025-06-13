import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { checkRateLimit } from '@/lib/rateLimiter';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'global';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { text } = await req.json();
  if (typeof text !== 'string') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: [
        { role: 'system', content: 'Extract expense info from user input' },
        { role: 'user', content: text },
      ],
      functions: [
        {
          name: 'parse_expense',
          description: 'Parse expense text',
          parameters: {
            type: 'object',
            properties: {
              amount: { type: 'number' },
              vendor: { type: 'string' },
              category: { type: 'string' },
              ts: { type: 'string', format: 'date-time' },
            },
            required: ['amount', 'vendor'],
          },
        },
      ],
      function_call: { name: 'parse_expense' },
    });
    const args = completion.choices[0].message?.function_call?.arguments || '{}';
    const data = JSON.parse(args);
    if (typeof data.amount !== 'number' || isNaN(data.amount)) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }
    if (data.ts && isNaN(Date.parse(data.ts))) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
    }
    if (data.vendor && typeof data.vendor !== 'string') {
      return NextResponse.json({ error: 'Invalid vendor' }, { status: 400 });
    }
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
