import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatPage from '../src/app/chat/page';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ data: { amount: 5 } }),
  }) as any;
});

afterEach(() => {
  (global.fetch as jest.Mock).mockReset();
});

test('sends expense message and shows parse response', async () => {
  const user = userEvent.setup();
  render(<ChatPage />);
  await user.type(screen.getByPlaceholderText('Enter expense...'), 'spent $5');
  await user.click(screen.getByRole('button', { name: /send/i }));
  await waitFor(() => expect(screen.getByText('{"amount":5}')).toBeInTheDocument());
  expect(global.fetch).toHaveBeenCalledWith('/api/parse', expect.anything());
});

test('routes questions to insights API', async () => {
  const user = userEvent.setup();
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ data: 'You spent $5' }),
  });
  render(<ChatPage />);
  await user.type(screen.getByPlaceholderText('Enter expense...'), 'total?');
  await user.click(screen.getByRole('button', { name: /send/i }));
  await waitFor(() => expect(screen.getByText('You spent $5')).toBeInTheDocument());
  expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.anything());
});

test('has responsive layout container', () => {
  render(<ChatPage />);
  expect(screen.getByRole('main')).toHaveClass('app-container');
});

test('shows question message and response', async () => {
  const user = userEvent.setup();
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ data: '42' }),
  });
  render(<ChatPage />);
  await user.type(screen.getByPlaceholderText('Enter expense...'), 'How much?');
  await user.click(screen.getByRole('button', { name: /send/i }));
  await waitFor(() => {
    expect(screen.getByText('How much?')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
  expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.anything());
});
