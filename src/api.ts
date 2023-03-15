// src/api.ts

const API_URL = "http://localhost:8080";

export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "send_chat_message",
      parameters: { message },
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response;
}

export async function getProfilePicture(): Promise<string> {
    const response = await fetch(`${API_URL}/generateProfilePicture`);
  
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.image_url;
  }
  