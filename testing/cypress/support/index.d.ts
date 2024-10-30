declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<any>;
    register(username: string, password: string): Chainable<any>;
  }
}
