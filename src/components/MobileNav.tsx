'use client';
import { useRouter } from 'next/router';

export default function MobileNav() {
  const router = useRouter();
  function handleClick(path: string, e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    router.push(path);
  }
  return (
    <nav className="mobile-nav">
      <a href="/chat" onClick={e => handleClick('/chat', e)}>Chat</a>
      <a href="/history" onClick={e => handleClick('/history', e)}>History</a>
    </nav>
  );
}
