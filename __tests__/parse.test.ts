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

(openai.chat.completions.create as jest.Mock).mockResolvedValue({
  choices: [{ message: { function_call: { arguments: '{"amount":5}' } } }],
});

describe('parse API', () => {
  it('returns parsed data', async () => {
    const req: any = { json: () => Promise.resolve({ text: 'spent $5' }) };
    const res = await POST(req);
    const json = await res.json();
    expect(json.data.amount).toBe(5);
  });
});
