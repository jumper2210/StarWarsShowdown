describe("Game Setup", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open the dialog", () => {
    cy.get('[data-testid="dialog-resources"]').should("be.visible");
  });

  it("should select a resource", () => {
    cy.get('[data-testid="resources"]').click();
    cy.get(".v-list-item").contains("Starship").click();
    cy.get('[data-testid="resources"]').should("contain", "Starship");
  });

  it("should close the dialog when start is clicked", () => {
    cy.get('[data-testid="start-btn"]').contains("Start").click();
    cy.get('[data-testid="dialog-resources"]').should("not.exist");
  });
});
