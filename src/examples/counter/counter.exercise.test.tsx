import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test.todo('it should render the component with an initial count', () => {
  render(<Counter initialCount={5} />);

  expect(screen.getByTestId('current-count')).toHaveTextContent('5');
});

test(
  'it should reset the count when the "Reset" button is pressed',
  async () => {
    const user = userEvent.setup();

    render(<Counter initialCount={5} />);

    const countValue = screen.getByTestId('current-count');

    const button = screen.getByRole("button",{name:"Increment"});

    await user.click(button);

    const resetBtn = await screen.findByText('Reset');

    await user.click(resetBtn);

    expect(countValue).toHaveTextContent('5');
  },
);
