export class ChatPage {
  /** Returns list of messages */
  get messagesList() {
    return cy.get('[data-testid="messages-list"]');
  }

  /** Returns input for message */
  get messageInput() {
    return cy.get('[data-testid="message-input"]');
  }

  /** Returns button to send message */
  get sendButton() {
    return cy.get('[data-testid="send-button"]');
  }

  /** Returns button to logout */
  get logoutButton() {
    return cy.get('[data-testid="logout-button"]');
  }

  /** Returns user info */
  get userInfo() {
    return cy.get('[data-testid="user-info"]');
  }

  /** Returns a message with given id */
  getMessage(id: string) {
    return cy.get(`[data-testid="message-${id}"]`);
  }

  /** Returns delete button for a message with given id */
  getMessageDeleteButton(id: string) {
    return cy.get(`[data-testid="delete-button-${id}"]`);
  }

  /** Returns username for a message with given id */
  getMessageUser(id: string) {
    return cy.get(`[data-testid="message-username-${id}"]`);
  }

  /** Returns content of a message with given id */
  getMessageContent(id: string) {
    return cy.get(`[data-testid="message-content-${id}"]`);
  }
}
