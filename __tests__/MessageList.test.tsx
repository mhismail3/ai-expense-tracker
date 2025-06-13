import { render, screen } from '@testing-library/react';
import MessageList, { Message } from '../src/components/MessageList';

test('renders messages with user alignment', () => {
  const messages: Message[] = [
    { role: 'user', content: 'hi' },
    { role: 'assistant', content: 'hello' },
  ];
  render(<MessageList messages={messages} />);
  const items = screen.getAllByRole('listitem');
  expect(items[0]).toHaveClass('text-right');
  expect(items[0]).toHaveTextContent('hi');
  expect(items[1]).not.toHaveClass('text-right');
});
