import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

let container;

beforeEach(() => {
  container = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  ).container;
});

afterEach(() => {
  container = null; // Reset container after each test
});

beforeAll(() => console.log("beforeAll tests"));
afterAll(() => console.log("afterAll tests"));

it("renders without crashing", function() {
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("matches snapshot", function() {
  const {asFragment} = render(<Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />);
  expect(asFragment()).toMatchSnapshot();
}); 

it("works when you click on the right arrow", function() {
  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
    expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow)

  // expect the last image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it("left arrow should not be in document", function() {
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(leftArrow).not.toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();
});

it("both arrows in document if not at end or start", function() {
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();
})

it("right arrow in document if not at end or start", function() {
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
})
