
Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-testid="username-input"]').clear().type(username);
    cy.get('[data-testid="password-input"]').clear().type(password);
    cy.get('[data-testid="auth-submit-button"]').contains('Login').click();
});

Cypress.Commands.add('register', (username, password) => {
    cy.get('[data-testid="auth-switch-button"]').click();
    cy.get('[data-testid="username-input"]').clear().type(username);
    cy.get('[data-testid="password-input"]').clear().type(password);
    cy.get('[data-testid="auth-submit-button"]').contains('Register').click();
    cy.get('[data-testid="auth-switch-button"]').click();
});
