import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { text } = await req.json();
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
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
