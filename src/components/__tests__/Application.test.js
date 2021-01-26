import React from "react";
import Application from "components/Application";

import { render, cleanup, waitForElement, getByText, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";
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
    const { container, debug } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //we call console after data loads
    //console.log("prettyDOM(container)", prettyDOM(container));

    //using getAllByTestId to search for all of the appointments in the container
    //we added data-testid=appointment to the <article> in index
    const appointments = getAllByTestId(container, "appointment");
    // console.log("prettyDOM(appointments): ", prettyDOM(appointments)); //output is an arr of DOM nodes
  
    const appointment = appointments[0]
    //const appointment = getAllByTestId(container, "appointment")[0];
    //console.log("prettyDOM(appointment): ", prettyDOM(appointment)); //it is an empty appointment
  
    // use debug() to output the current state of the DOM
    console.log("debug(appointment): ", debug(appointment));

    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    //Use the expect function to verify that the the appointment element contains the text "Saving" immediately after the "Save" button is clicked
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    
  });


});
