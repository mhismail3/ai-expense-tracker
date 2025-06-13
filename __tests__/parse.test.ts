import { openai } from '../src/lib/openai';
import { POST } from '../src/app/api/parse/route';

jest.mock('../src/lib/openai');

const mockedCreate = jest.fn().mockResolvedValue({
  choices: [{ message: { function_call: { arguments: '{"amount":5}' } } }],
});
(openai.chat as any) = { completions: { create: mockedCreate } };

describe('parse API', () => {
  it('returns parsed data', async () => {
    const req: any = { json: () => Promise.resolve({ text: 'spent $5' }) };
    const res = await POST(req);
    const json = await res.json();
    expect(json.data.amount).toBe(5);
  });
});
