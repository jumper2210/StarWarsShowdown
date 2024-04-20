describe("Game Setup", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should simulate one game round", () => {
    cy.intercept("GET", "https://www.swapi.tech/api/starships/*").as(
      "getStarship"
    );

    cy.get('[data-testid="dialog-resources"]').should("be.visible");
    cy.get('[data-testid="resources"]').click();
    cy.get(".v-list-item").contains("Starship").click();
    cy.get('[data-testid="resources"]').should("contain", "Starship");
    cy.get('[data-testid="start-btn"]').contains("Start").click();
    cy.get('[data-testid="play-btn"]').click();

    cy.wait("@getStarship", { timeout: 10000 })
      .its("request.method")
      .should("equal", "GET")
      .then(() => {
        cy.wait("@getStarship", { timeout: 10000 })
          .its("request.method")
          .should("equal", "GET");
      });

    cy.get('[data-testid="left-card"]').should("be.visible");
    cy.get('[data-testid="right-card"]').should("be.visible");
    cy.wait(1500);
    cy.get('[data-testid="winner-modal"]').should("be.visible");
  });
});
