import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { sendChatMessage } from "./api";
import ChatThread from "./ChatThread";


interface ChatMessageData {
  id: number;
  sender: "user" | "ai";
  message: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);

  const handleMessageSubmit = async (message: string) => {
    const userMessage: ChatMessageData = {
      id: messages.length,
      sender: "user",
      message,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const aiResponse = await sendChatMessage(message);
      const aiMessage: ChatMessageData = {
        id: messages.length + 1,
        sender: "ai",
        message: aiResponse,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to send chat message:", error);
    }
  };

  const sidePanelItems = [
    "Character 1",
    "Character 2",
    "Character 3",
    "Character 4",
  ];

  return (
    <div className="chat">
      <div className="side-panel">
        {sidePanelItems.map((item, index) => (
          <div key={index} className="side-panel-item">
            {item}
          </div>
        ))}
      </div>
      <div className="chatInputMessages">
      <div className="chat-messages">
        
       <ChatThread messages={messages}></ChatThread>
      </div>
      <ChatInput onSubmit={handleMessageSubmit} />
    </div>
    </div>
  );
};

export default Chat;
