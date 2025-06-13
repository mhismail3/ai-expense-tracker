import { FormEvent } from 'react';

export default function InputBar({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <input
        className="flex-1"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter expense..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
