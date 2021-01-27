describe("Appointments", () => {

  it("should book an interview", () => {
    cy.visit("/")
    cy.contains("Monday")

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
  });

  
});