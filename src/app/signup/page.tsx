'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    setError(error ? error.message : null);
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}
