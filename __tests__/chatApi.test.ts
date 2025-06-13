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
import { resetRateLimiter, MAX_REQUESTS } from '../src/lib/rateLimiter';

(openai.chat.completions.create as jest.Mock).mockResolvedValue({
  choices: [{ message: { content: 'You spent $5' } }],
});

describe('chat API', () => {
  beforeEach(() => {
    resetRateLimiter();
  });
  it('returns answer from openai', async () => {
    const req: any = { json: () => Promise.resolve({ userId: '1', question: 'total?' }), headers: new Headers() };
    const res = await POST(req as any);
    const json = await res.json();
    expect(json.data).toBe('You spent $5');
  });

  it('rejects invalid input', async () => {
    const req: any = { json: () => Promise.resolve({ userId: 1, question: null }), headers: new Headers({ 'x-forwarded-for': '3' }) };
    const res = await POST(req as any);
    const json = await res.json();
    expect(json.error).toBe('Invalid input');
  });

  it('rate limits requests', async () => {
    const req: any = { json: () => Promise.resolve({ userId: '1', question: 'total?' }), headers: new Headers({ 'x-forwarded-for': '4' }) };
    for (let i = 0; i < MAX_REQUESTS; i++) {
      await POST(req as any);
    }
    const res = await POST(req as any);
    const json = await res.json();
    expect(json.error).toBe('Too many requests');
  });
});
