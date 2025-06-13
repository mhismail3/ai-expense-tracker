import { render, screen, waitFor } from '@testing-library/react';
import HistoryPage from '../src/app/history/page';

jest.mock('../src/lib/supabaseClient', () => ({
  supabase: {
    auth: { getUser: jest.fn() },
    from: jest.fn(),
  },
}));

import { supabase } from '../src/lib/supabaseClient';

it('renders expenses from supabase', async () => {
  (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: { id: '1' } } });
  const orderMock = jest.fn().mockResolvedValue({ data: [
    { amount: 5, vendor: 'Coffee', category: 'Food', ts: '2024-01-01T00:00:00Z' }
  ], error: null });
  const eqMock = jest.fn(() => ({ order: orderMock }));
  const selectMock = jest.fn(() => ({ eq: eqMock }));
  (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

  render(<HistoryPage />);
  await waitFor(() => expect(screen.getByText('Coffee')).toBeInTheDocument());
  expect(screen.getByText('5')).toBeInTheDocument();
});
