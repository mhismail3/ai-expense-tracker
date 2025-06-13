import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MobileNav from '../src/components/MobileNav';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

it('renders links and navigates via router', async () => {
  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push });
  const user = userEvent.setup();
  render(<MobileNav />);
  const chatLink = screen.getByRole('link', { name: /chat/i });
  const historyLink = screen.getByRole('link', { name: /history/i });
  expect(chatLink).toBeInTheDocument();
  expect(historyLink).toBeInTheDocument();
  await user.click(chatLink);
  expect(push).toHaveBeenCalledWith('/chat');
  await user.click(historyLink);
  expect(push).toHaveBeenCalledWith('/history');
});
