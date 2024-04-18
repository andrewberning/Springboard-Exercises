import { expect, it, vi } from 'vitest';
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Box from './Box';

it("renders without crashing", function () {
  render(<Box />);
});

it("matches snapshot", function() {
  const {asFragment} = render(<Box />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders box with default props", function() {
  const { getByTestId } = render(<Box id="1" />);

  const box = getByTestId('box');
  expect(box).toBeInTheDocument();
  expect(box).toHaveStyle('width: 5em');
  expect(box).toHaveStyle('height: 5em');
  expect(box).toHaveStyle('background-color: rgb(0, 0, 255)');
})

it('renders box with custom props', () => {
  const { getByTestId } = render(<Box id="1" width={10} height={10} color="red" />);
  
  const box = getByTestId('box'); // Ensure data-testid is set correctly
  expect(box).toHaveStyle('width: 10em');
  expect(box).toHaveStyle('height: 10em');
  expect(box).toHaveStyle('background-color: rgb(255, 0, 0)');
});

it("invokes handleRemove when remove button is clicked", function() {
  const handleRemoveMock = vi.fn();
  const { getByText } = render(<Box id="1" handleRemove={handleRemoveMock} />);
  const removeBtn = getByText("X");
  fireEvent.click(removeBtn);

  expect(handleRemoveMock).toHaveBeenCalledWith('1');
})