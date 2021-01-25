import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", () => {
 
  //we need to be asynchronous
  //wait for the fake API request to complete before we confirm that the data has loaded
  //Before we request the data from the API, we won't render any days

  //Use waitForElement to wait for the text "Monday" to appear in the document

  const { getByText } = render(<Application />);
  return waitForElement(() => getByText("Monday"));
});
