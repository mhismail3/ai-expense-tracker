import { render, screen } from '@testing-library/react';
jest.mock('../src/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({ limit: jest.fn(() => ({ data: [] })) })),
    })),
  },
}));

import HistoryPage from '../src/app/history/page';

test('renders responsive layout container', () => {
  render(<HistoryPage />);
  expect(screen.getByRole('main')).toHaveClass('app-container');
});
