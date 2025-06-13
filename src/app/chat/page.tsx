'use client';
import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const res = await fetch('/api/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });
    const { data } = await res.json();
    const botMessage = { role: 'assistant', content: JSON.stringify(data) };
    setMessages(prev => [...prev, botMessage]);
  }

  return (
    <main>
      <h1>Chat</h1>
      <div aria-live="polite">
        {messages.map((m, i) => (
          <p key={i} className={m.role === 'user' ? 'text-right' : ''}>{m.content}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter expense..."
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
