import React, { useState } from "react";
import { sendMessage } from "../api";
import "./MessageForm.css";

export default function MessageForm({ token, user, socket }) {
  const [text, setText] = useState("");

  const onSend = async () => {
    if (text.trim()) {
      try {
        const response = await sendMessage(text, token);
        socket.emit("sendMessage", { ...response.data.message, user });
        setText("");
        console.log("Message sent successfully");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="message-form">
      <input
        data-testid="message-input"
        className="text-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message"
      />
      <button data-testid="send-button" disabled={!text} className="send-button" onClick={onSend}>Send</button>
    </div>
  );
}
