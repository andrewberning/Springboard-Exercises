import { expect, it, vi } from 'vitest';
import { render, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom';
import Todo from './Todo';

it("renders without crashing", function() {
  render(<Todo />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Todo />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when editing", function() {
  const { asFragment, getByText } = render(<Todo />);
  fireEvent.click(getByText("Edit"));
  expect(asFragment()).toMatchSnapshot();
});

it("runs the update function on form submit", function() {
  const updateMock = vi.fn();
  const { getByText } = render(<Todo update={updateMock} />);
  fireEvent.click(getByText("Edit"));
  fireEvent.click(getByText("Update"));
  expect(updateMock).toHaveBeenCalled();
});

it("runs the delete function on button click", function() {
  const removeMock = vi.fn();
  const { getByText } = render(<Todo remove={removeMock}/>)
  fireEvent.click(getByText("X"));
  expect(removeMock).toHaveBeenCalled();
});