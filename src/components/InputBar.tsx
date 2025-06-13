import { FormEvent, useEffect, useRef } from 'react';

export default function InputBar({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit();
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <input
        ref={inputRef}
        id="chat-input"
        aria-label="Message"
        className="flex-1"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter expense..."
      />
      <button type="submit" aria-label="Send message">Send</button>
    </form>
  );
}
