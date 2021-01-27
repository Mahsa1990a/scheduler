describe("Appointments", () => {

  //Common Behaviour
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
  });

  it("should book an interview", () => {

    //Clicks on the "Add" button in the second appointment
    // cy.get(':nth-child(2) > .appointment__add > .appointment__add-button').click(); OR :
    cy.get("[alt=Add]")
      .first()
      .click();

    //Enters their name
    cy.get('[data-testid=student-name-input]').type("Lydia Miller-Jones");

    //Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    //Clicks the save button
    cy.contains("Save").click();

    //Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  
});