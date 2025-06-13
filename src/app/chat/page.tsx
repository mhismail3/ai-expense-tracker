'use client';
import { useState } from 'react';
import MessageList, { Message } from '@/components/MessageList';
import InputBar from '@/components/InputBar';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  async function sendMessage() {
    const text = input;
    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const isQuestion = text.trim().endsWith('?');
    const endpoint = isQuestion ? '/api/chat' : '/api/parse';
    const body = isQuestion ? { userId: '1', question: text } : { text };
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const { data } = await res.json();
    const content = typeof data === 'string' ? data : JSON.stringify(data);
    const botMessage: Message = { role: 'assistant', content };
    setMessages(prev => [...prev, botMessage]);
  }

  return (
    <main>
      <h1>Chat</h1>
      <MessageList messages={messages} />
      <InputBar value={input} onChange={setInput} onSubmit={sendMessage} />
    </main>
  );
}
