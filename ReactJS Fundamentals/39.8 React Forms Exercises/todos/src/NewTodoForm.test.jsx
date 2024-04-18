import { expect, it, vi } from 'vitest';
import { render, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom';
import NewTodoForm from './NewTodoForm';

it("renders without crashing", function() {
  render(<NewTodoForm />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("runs the create function on form submit", function() {
  const createMock = vi.fn();
  const { getByText} = render(<NewTodoForm createTodo={createMock} />);
  
  fireEvent.click(getByText("Add Todo"));
  expect(createMock).toHaveBeenCalled();
})