
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getConciergeResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/api/concierge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.response || data.message;
  } catch (error) {
    console.error("Concierge API Error:", error);
    return "Je vous prie d'accepter mes excuses. Un imprévu technique m'empêche de vous assister. Je vous invite à nous contacter par téléphone pour un service immédiat.";
  }
};
