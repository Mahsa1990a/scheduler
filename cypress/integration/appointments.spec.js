describe("Appointments", () => {

  it("should book an interview", () => {
    cy.visit("/")
    cy.contains("Monday")
    // cy.get(':nth-child(2) > .appointment__add > .appointment__add-button').click(); OR :
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get('[data-testid=student-name-input]').type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']").click();
  });

  
});