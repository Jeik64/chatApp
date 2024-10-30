import { userA, userB } from '../../fixtures/users.json';
import { ChatPage } from '../../page-object/chatPage';
import { LoginPage } from '../../page-object/loginPage';

describe('Message Sending and Validation Flow', () => {
  const loginPage = new LoginPage();
  const chatPage = new ChatPage();

  let messageId = '';
  const message = 'Hello from User A!';

  beforeEach(() => {
    cy.visit('/');
  });

  it('logs in as User A and checks validation error for empty message', () => {
    loginPage.login(userA.username, userA.password);

    chatPage.messageInput.should('be.empty');
    chatPage.sendButton.should('be.disabled');
  });

  it('sends a message, verifies it is sent, logs out, and logs in as User B to check visibility', () => {
    cy.login(userA.username, userA.password);

    cy.intercept('POST', '**/messages').as('sendMessage');

    chatPage.messageInput.type(message);
    chatPage.sendButton.click();

    cy.wait('@sendMessage').then((interception) => {
      messageId = interception.response?.body.message._id;

      chatPage.getMessage(messageId).should('be.visible');

      chatPage.logoutButton.click();
      loginPage.authState.should('be.visible');

      loginPage.login(userB.username, userB.password);

      chatPage.getMessageContent(messageId).should('contain', message);
    });
  });

});
