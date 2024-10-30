
export class LoginPage {
  /** Returns input for username */
  get usernameInput() {
    return cy.get('[data-testid="username-input"]');
  };

  /** Returns input for password */
  get passwordInput() {
    return cy.get('[data-testid="password-input"]');
  };

  /** Returns button to submit username and password */
  get submitButton() {
    return cy.get('[data-testid="auth-submit-button"]');
  };

  /** Returns error message when login or registration fails */
  get authError() {
    return cy.get('[data-testid="auth-error-message"]');
  };

  /** Returns button to switch between login and registration modes */
  get authSwitchButton() {
    return cy.get('[data-testid="auth-switch-button"]');
  };

  /** Returns current auth state */
  get authState() {
    return cy.get('[data-testid="auth-state"]');
  };

  /** Logs in with given username and password */
  login(username: string, password: string) {
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.submitButton.click();
  }

  /** Registers with given username and password */
  register(username: string, password: string) {
    this.authSwitchButton.click();
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.submitButton.click();
    this.authSwitchButton.click();
  }
}
