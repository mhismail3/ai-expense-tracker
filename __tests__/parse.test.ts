jest.mock('../src/lib/openai', () => ({
  openai: { chat: { completions: { create: jest.fn() } } },
}));
jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: jest.fn((data: any) => ({ json: () => Promise.resolve(data) })),
    },
  };
});

import { openai } from '../src/lib/openai';
import { POST } from '../src/app/api/parse/route';
import { resetRateLimiter, MAX_REQUESTS } from '../src/lib/rateLimiter';

(openai.chat.completions.create as jest.Mock).mockResolvedValue({
  choices: [{ message: { function_call: { arguments: '{"amount":5}' } } }],
});

describe('parse API', () => {
  beforeEach(() => {
    resetRateLimiter();
  });
  it('returns parsed data', async () => {
    const req: any = { json: () => Promise.resolve({ text: 'spent $5' }), headers: new Headers() };
    const res = await POST(req);
    const json = await res.json();
    expect(json.data.amount).toBe(5);
  });

  it('rejects invalid amount', async () => {
    (openai.chat.completions.create as jest.Mock).mockResolvedValueOnce({
      choices: [{ message: { function_call: { arguments: '{"amount":"bad"}' } } }],
    });
    const req: any = { json: () => Promise.resolve({ text: 'bad' }), headers: new Headers({ 'x-forwarded-for': '1' }) };
    const res = await POST(req);
    const json = await res.json();
    expect(json.error).toBe('Invalid amount');
  });

  it('rate limits requests', async () => {
    const req: any = { json: () => Promise.resolve({ text: 'spent $5' }), headers: new Headers({ 'x-forwarded-for': '2' }) };
    for (let i = 0; i < MAX_REQUESTS; i++) {
      await POST(req);
    }
    const res = await POST(req);
    const json = await res.json();
    expect(json.error).toBe('Too many requests');
  });
});
