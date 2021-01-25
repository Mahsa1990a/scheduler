//We are rendering `<Application />` down below, so we need React.createElement
import React from "react";

// We import our helper functions from the react-testing-library
// The render function allows us to render Components
import { render } from "@testing-library/react";

//We import the component that we are testing
import Appointment from "components/Appointment";

//If we want to group a series of tests, we can wrap them all in a describe function
//A test that renders a React Component
describe("Appointment", () => {

  it("renders without crashing", () => {
    render(<Appointment />);
  });

  //We can create a basic mock in any test by calling the jest.fn() function
  it("doesn't call the function", () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("calls the function", () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
   });

   it("calls the function with specific arguments", () => {
    const fn = jest.fn();
    fn(10);
    expect(fn).toHaveBeenCalledWith(10);
   });

   //we can make the function do whatever we want
   it("uses the mock implementation", () => {
    const fn = jest.fn((a, b) => 42);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(42);
   });
});