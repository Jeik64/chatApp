import users from '../../fixtures/users.json';
import { ChatPage } from '../../page-object/chatPage';
import { LoginPage } from '../../page-object/loginPage';

describe('Login Page Tests', () => {
  const loginPage = new LoginPage();
  const chatPage = new ChatPage();

  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow filling in the username', () => {
    const username = loginPage.usernameInput;
    username.type(users.userA.username);
    username.should('have.value', users.userA.username);
  });

  it('should allow filling in the password', () => {
    const password = loginPage.passwordInput;
    password.type(users.userA.password);
    password.should('have.value', users.userA.password);
  });

  it('should fill in correct username and password and display the chat interface', () => {
    loginPage.login(users.userA.username, users.userA.password);
    chatPage.userInfo.contains(users.userA.username);
    chatPage.messagesList.should('be.visible');
  });

  it('should display error alert for incorrect username and password', () => {
    loginPage.login("invalidUsername", "invalidPassword");
    loginPage.authError.should('be.visible');
  });

  it("should prevent MongoDB injection in login", () => {
    const injectionPayloads = [
      { username: 'admin" OR "1"="1"', password: 'password' },
      { username: '"; db.users.find(); //', password: 'password' },
      { username: '<script>alert("XSS")</script>', password: 'password' },
    ];

    injectionPayloads.forEach((payload) => {
      cy.visit("/");

      loginPage.login(payload.username, payload.password);

      loginPage.authError.should('be.visible');
    });
  });
});
