
import React from "react";
import CharacterCard from "./CharacterCard";
import ChatMessage from "./ChatMessage";
interface ChatMessageData {
    id: number;
    sender: "user" | "ai";
    message: string;
  }
interface ChatMessageListProps {
    messages: ChatMessageData[];
  }
  const ChatThread: React.FC<ChatMessageListProps> = ( messages ) => {
   
    if (messages.messages.length === 0) {
        return (
            <div className="character-card-grid">
        <CharacterCard playerName="John Snow"></CharacterCard>
        <CharacterCard playerName="Joe Biddin"></CharacterCard>
        <CharacterCard playerName="Elon Tusk"></CharacterCard>
        <CharacterCard playerName="Jeffery Preston Bzos"></CharacterCard>
        </div>
        )
      } else {
    return (
      <div>
        {messages.messages.map(({ id, sender, message }) => (
          <ChatMessage key={id} sender={sender} message={message} />
        ))}
      </div>
    );
      }
  };
  
  export default ChatThread;
  