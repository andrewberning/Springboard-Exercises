import { expect, it } from 'vitest';
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import BoxList from './BoxList';




it("renders without crashing", function () {
  render(<BoxList />)
});

it("matches snapshot", function() {
  const {asFragment} = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("should add new item", function() {
  const { queryByText, getByLabelText } = render(<BoxList />)
  const btn = queryByText("Add Color Box");
  const boxContainer = document.querySelector("#boxes-container");

  expect(boxContainer.children.length).toBe(0);
  fireEvent.change(getByLabelText("Width:"), {value: 5});
  fireEvent.change(getByLabelText("Height:"), {value: 5});
  fireEvent.change(getByLabelText("Background Color:"), {value: 'red'});
  fireEvent.click(btn);
  expect(boxContainer.children.length).toBe(1);
})