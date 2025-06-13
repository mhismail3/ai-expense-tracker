import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputBar from '../src/components/InputBar';

it('calls onChange and onSubmit', async () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const user = userEvent.setup();
  render(<InputBar value="" onChange={handleChange} onSubmit={handleSubmit} />);
  const input = screen.getByRole('textbox', { name: /message/i });
  expect(input).toHaveFocus();
  await user.type(input, 'coffee');
  expect(handleChange).toHaveBeenCalled();
  await user.click(screen.getByRole('button', { name: /send message/i }));
  expect(handleSubmit).toHaveBeenCalled();
  expect(input).toHaveFocus();
});
