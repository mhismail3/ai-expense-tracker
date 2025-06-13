import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpPage from '../src/app/signup/page';
jest.mock('../src/lib/supabaseClient', () => ({
  supabase: { auth: { signUp: jest.fn() } },
}));

import { supabase } from '../src/lib/supabaseClient';

it('calls signUp', async () => {
  const user = userEvent.setup();
  const signUp = (supabase.auth.signUp as jest.Mock).mockResolvedValue({ error: null });
  render(<SignUpPage />);
  await user.type(screen.getByPlaceholderText('Email'), 'a@b.com');
  await user.type(screen.getByPlaceholderText('Password'), 'pw');
  await user.click(screen.getByRole('button', { name: /sign up/i }));
  expect(signUp).toHaveBeenCalledWith({ email: 'a@b.com', password: 'pw' });
});
