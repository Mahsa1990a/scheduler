import React from "react";
import Application from "components/Application";

import { render, cleanup, waitForElement, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
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
    //console.log("prettyDOM(container)", prettyDOM(container));

    //using getAllByTestId to search for all of the appointments in the container
    //we added data-testid=appointment to the <article> in index
    const appointments = getAllByTestId(container, "appointment");
    // console.log("prettyDOM(appointments): ", prettyDOM(appointments)); //output is an arr of DOM nodes
  
    const appointment = appointments[0]
    //const appointment = getAllByTestId(container, "appointment")[0];
    //console.log("prettyDOM(appointment): ", prettyDOM(appointment)); //it is an empty appointment
  
    // use debug() to output the current state of the DOM
    //console.log("debug(appointment): ", debug(appointment));

    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    //Use the expect function to verify that the the appointment element contains the text "Saving" immediately after the "Save" button is clicked
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //wait for the element that contains the name "Lydia Miller-Jones" to appear
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => 
      //use queryByText because we'll have null returned if it doesn't find the node
      //if we use getBy test will throw an error and fail if it doesn't find the text "Monday" on the first iteration
      getByText(day, "Monday")
    );
    //console.log("prettyDOM(day): ", prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => 
      getByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

});
