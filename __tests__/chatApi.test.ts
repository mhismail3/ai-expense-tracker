jest.mock('../src/lib/openai', () => ({
  openai: { chat: { completions: { create: jest.fn() } } },
}));
jest.mock('../src/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          gte: jest.fn(() => Promise.resolve({ data: [{ amount: 5 }], error: null })),
        })),
      })),
      })),
  },
}));
jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: jest.fn((data: any) => ({ json: () => Promise.resolve(data) })),
    },
  };
});

import { openai } from '../src/lib/openai';
import { supabase } from '../src/lib/supabaseClient';
import { POST } from '../src/app/api/chat/route';

(openai.chat.completions.create as jest.Mock).mockResolvedValue({
  choices: [{ message: { content: 'You spent $5' } }],
});

describe('chat API', () => {
  it('returns answer from openai', async () => {
    const req: any = { json: () => Promise.resolve({ userId: '1', question: 'total?' }) };
    const res = await POST(req as any);
    const json = await res.json();
    expect(json.data).toBe('You spent $5');
  });
});
