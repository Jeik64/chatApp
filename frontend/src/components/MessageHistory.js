import React, { useEffect, useRef, useState } from "react";
import { deleteMessage, fetchMessages } from "../api";
import "./MessageHistory.css";

const MessageHistory = ({ token, user, socket }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  socket.off("getMessage");
  socket.on("getMessage", (message) => {
    setMessages((prev) => [...prev, message]);
    console.log("New message received:", message);
  });

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetchMessages(token);
      setMessages(response.data.messages);
    };
    fetchHistory();
  }, [token]);

  useEffect(() => {
    const { scrollTop, scrollHeight, clientHeight } = messagesEndRef.current.parentNode;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  const onDelete = async (id) => {
    try {
      await deleteMessage(id, token);
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <div className="messages-list" data-testid="messages-list">
      <ul>
        {messages.map((msg) => (
          <li className="message" data-testid={`message-${msg._id}`} key={msg._id}>
            <strong className="username" data-testid={`message-username-${msg._id}`}  >{msg.user.username ?? msg.user}:</strong>
            <span className="message-content" data-testid={`message-content-${msg._id}`}>{msg.text}</span>
            {(msg.user.username === user || msg.user === user) && (
              <button className="delete-button" data-testid={`delete-button-${msg._id}`} onClick={() => onDelete(msg._id)}>
                Delete
              </button>
            )}
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
};

export default MessageHistory;
