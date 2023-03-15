// src/CharacterCard.tsx

import React, { useEffect, useState } from "react";
import { getProfilePicture } from "./api";
import "./CharacterCard.css";

interface CharacterCardProps {
  playerName: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ playerName }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const profilePictureUrl = await getProfilePicture();
        setImageUrl(profilePictureUrl);
      } catch (error) {
        console.error("Failed to fetch profile picture:", error);
      }
    })();
  }, []);

  return (
    <div className="character-card">
      <img src={imageUrl} alt={`${playerName}'s profile`} className="character-card__image" />
      <h2 className="character-card__title">{playerName}</h2>
      <p className="character-card__description">Character description here...</p>
      <button className="character-card__button">Chat with {playerName}</button>
    </div>
  );
};

export default CharacterCard;
