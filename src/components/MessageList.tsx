import { useEffect, useRef } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function MessageList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ul role="list" aria-live="polite">
      {messages.map((m, i) => (
        <li role="listitem" key={i} className={m.role === 'user' ? 'text-right' : ''}>
          {m.content}
        </li>
      ))}
      <li
        aria-hidden="true"
        ref={bottomRef}
        style={{ listStyle: 'none', height: 0 }}
      />
    </ul>
  );
}
