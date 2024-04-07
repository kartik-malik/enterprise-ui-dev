import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
test('it should render the component', async () => {
  render(<Counter />);

  // expect.hasAssertions();
  const countValue =  screen.getByTestId('current-count');

  expect(countValue).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  render(<Counter />);

  const user = userEvent.setup();

  const countValue = await screen.findByTestId('current-count');

  const button = await screen.findByRole('button',{name:"Increment"});

   await user.click(button);

  expect(countValue).toHaveTextContent("1");
});
