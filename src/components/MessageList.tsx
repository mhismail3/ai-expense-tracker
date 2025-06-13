import { useEffect, useRef } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function MessageList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ul aria-live="polite">
      {messages.map((m, i) => (
        <li key={i} className={m.role === 'user' ? 'text-right' : ''}>
          {m.content}
        </li>
      ))}
      <div ref={bottomRef} />
    </ul>
  );
}
