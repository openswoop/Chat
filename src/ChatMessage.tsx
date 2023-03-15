import React from "react";

interface ChatMessageProps {
  message: string;
  sender: "user" | "ai";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <div className={`chat-message ${sender}`}>
      <span>{message}</span>
    </div>
  );
};

export default ChatMessage;
