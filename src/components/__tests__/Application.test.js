import React from "react";
import Application from "components/Application";

import { render, cleanup, waitForElement, getByText } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";
import { prettyDOM } from "@testing-library/react"; //it's a function

afterEach(cleanup);

describe("Application", () => {
  // it("defaults to Monday and changes the schedule when a new day is selected", () => {
  
  //   //we need to be asynchronous
  //   //wait for the fake API request to complete before we confirm that the data has loaded
  //   //Before we request the data from the API, we won't render any days

  //   //Use waitForElement to wait for the text "Monday" to appear in the document

  //   const { getByText } = render(<Application />);
  //   //We can make our test asynchronous by returning a Promise
  //   return waitForElement(() => getByText("Monday"))
  //     .then(() => {
  //       fireEvent.click(getByText("Tuesday"));
  //       expect(getByText("Leopold Silvers")).toBeInTheDocument();
  //     });
  // });

  //using the raw Promise syntax to the newer async/await syntax:
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //we call console after data loads
    console.log("prettyDOM(container)", prettyDOM(container));
  });


});
