import { expect, it, vi } from 'vitest';
import { render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import NewBoxForm from './NewBoxForm';

it("renders without crashing", function () {
  render(<NewBoxForm />);
});

it("matches snapshot", function() {
  const {asFragment} = render(<NewBoxForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("updates form input values when typing", function() {
  const { getByLabelText } = render(<NewBoxForm />);
  const widthInput = getByLabelText("Width:");
  const heightInput = getByLabelText("Height:");
  const colorInput = getByLabelText("Background Color:");

  fireEvent.change(widthInput, { target: { value: 5 } });
  fireEvent.change(heightInput, { target: { value: 5 } });
  fireEvent.change(colorInput, { target: { value: "red" } });

  expect(widthInput.value).toBe("5");
  expect(heightInput.value).toBe("5");
  expect(colorInput.value).toBe("red");
});

it("submits form with correct data", async function() {
  const addBoxMock = vi.fn();
  const { queryByText, getByLabelText } = render(<NewBoxForm addBox={addBoxMock} />);
  const btn = queryByText("Add Color Box");

  fireEvent.change(getByLabelText('Width:'), { target: { value: '5' } });
  fireEvent.change(getByLabelText('Height:'), { target: { value: '5' } });
  fireEvent.change(getByLabelText('Background Color:'), { target: { value: 'red' } });

  fireEvent.click(btn);

  await waitFor(() => {
    expect(addBoxMock).toHaveBeenCalledWith({ width: "5", height: "5", color: "red", id: expect.any(String)});
  });
});

it("resets form after submission", async function() {
  const addBoxMock = vi.fn();
  const { queryByText, getByLabelText } = render(<NewBoxForm addBox={addBoxMock}/>);
  const widthInput = getByLabelText("Width:");
  const heightInput = getByLabelText("Height:");
  const colorInput = getByLabelText("Background Color:");
  const btn = queryByText("Add Color Box");

  fireEvent.change(widthInput, { target: { value: 5 } });
  fireEvent.change(heightInput, { target: { value: 5 } });
  fireEvent.change(colorInput, { target: { value: "red" } });

  fireEvent.click(btn);

  await waitFor(() => {
    expect(widthInput.value).toBe("");
    expect(heightInput.value).toBe("");
    expect(colorInput.value).toBe("");
  });
});