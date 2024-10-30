import React from "react";
import io from "socket.io-client";
import "./Chat.css";
import MessageForm from './MessageForm';
import MessageHistory from './MessageHistory';

const socket = io("http://localhost:5000");

const Chat = ({ token, user, setToken, setUser }) => {
  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <div className="chat-container">
      <button className="logout-button" data-testid="logout-button" onClick={handleLogout}>Logout</button>
      <p className="user-info" data-testid="user-info">Logged in as: {user}</p>
      <h3 className="chat-header">Chat Room</h3>
      <MessageHistory token={token} user={user} socket={socket} />
      <MessageForm token={token} user={user} socket={socket} />
    </div>
  );
};

export default Chat;
