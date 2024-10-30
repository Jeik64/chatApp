import { userA, userB } from '../../fixtures/users.json';
import { ChatPage } from '../../page-object/chatPage';
import { LoginPage } from '../../page-object/loginPage';

describe('Message Deletion Flow', () => {
  const loginPage = new LoginPage();
  const chatPage = new ChatPage();

  let messageId = '';
  const message = 'Hello, this is a test message!';

  beforeEach(() => {
    cy.visit('/');
  });

  it('logs in as User A, sends a message, deletes it, and verifies deletion', () => {
    loginPage.login(userA.username, userA.password);


    cy.intercept('POST', '**/messages').as('sendMessage');

    chatPage.messageInput.type(message);
    chatPage.sendButton.click();

    cy.wait('@sendMessage').then((interception) => {
      messageId = interception.response?.body.message._id;

      chatPage.getMessage(messageId).should('be.visible');

      chatPage.getMessageDeleteButton(messageId).click();
      chatPage.getMessage(messageId).should('not.exist');

      chatPage.logoutButton.click();

      loginPage.login(userB.username, userB.password);

      chatPage.messagesList.should('be.visible');
      chatPage.getMessage(messageId).should('not.exist');
    });
  });
});
