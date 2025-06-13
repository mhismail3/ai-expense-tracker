import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../src/app/login/page';
jest.mock('../src/lib/supabaseClient', () => ({
  supabase: { auth: { signInWithPassword: jest.fn() } },
}));

import { supabase } from '../src/lib/supabaseClient';

it('calls signInWithPassword', async () => {
  const user = userEvent.setup();
  const signIn = (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({ error: null });
  render(<LoginPage />);
  await user.type(screen.getByPlaceholderText('Email'), 'a@b.com');
  await user.type(screen.getByPlaceholderText('Password'), 'pw');
  await user.click(screen.getByRole('button', { name: /login/i }));
  expect(signIn).toHaveBeenCalledWith({ email: 'a@b.com', password: 'pw' });
});
