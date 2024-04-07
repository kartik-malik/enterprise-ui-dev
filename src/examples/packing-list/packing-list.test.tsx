import {
  findByDisplayValue,
  findByLabelText,
  findByRole,
  render,
  screen,
} from 'test/utilities';
import PackingList from '.';
import userEvent from '@testing-library/user-event';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  const { user } = render(<PackingList />);

  const input = screen.getByLabelText('New Item Name');

  expect(input).toBeInTheDocument();
});

it('has a "Add New Item" button that is disabled when the input is empty', async () => {
  const { user } = render(<PackingList />);

  const button = await screen.findByLabelText('Add New Item');

  expect(button).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);

  const input = screen.getByLabelText('New Item Name');

  await user.type(input, '123');

  const button = await screen.findByLabelText('Add New Item');

  expect(button).not.toBeDisabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);

  const input = screen.getByLabelText('New Item Name');

  await user.type(input, '123');

  const button = await screen.findByLabelText('Add New Item');

  await user.click(button);

  expect(input).toHaveValue('');

  const list = await screen.findByTestId('unpacked-items-list');

  const removeButton = await findByLabelText(list, 'Remove 123');

  expect(removeButton).toBeInTheDocument();

  await userEvent.click(removeButton);
  
  expect(removeButton).not.toBeInTheDocument();


});
