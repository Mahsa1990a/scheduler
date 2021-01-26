import React from "react";
import Application from "components/Application";

import { render, cleanup, waitForElement } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";


afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
  
    //we need to be asynchronous
    //wait for the fake API request to complete before we confirm that the data has loaded
    //Before we request the data from the API, we won't render any days

    //Use waitForElement to wait for the text "Monday" to appear in the document

    const { getByText } = render(<Application />);
    //We can make our test asynchronous by returning a Promise
    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });
});
