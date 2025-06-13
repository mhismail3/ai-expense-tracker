import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputBar from '../src/components/InputBar';

it('calls onChange and onSubmit', async () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const user = userEvent.setup();
  render(<InputBar value="" onChange={handleChange} onSubmit={handleSubmit} />);
  const input = screen.getByPlaceholderText('Enter expense...');
  await user.type(input, 'coffee');
  expect(handleChange).toHaveBeenCalled();
  await user.click(screen.getByRole('button', { name: /send/i }));
  expect(handleSubmit).toHaveBeenCalled();
});
