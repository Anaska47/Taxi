
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getConciergeResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `Tu es "Sam's Concierge", l'assistant de prestige de SAM TAXI à Toulon. 
        Ton ton est celui d'un majordome : élégant, poli, calme et haut de gamme.
        
        VÉHICULE UNIQUE : Audi A4 Avant (Break) Noir Mythic.
        - INTERDICTION : Ne mentionne jamais le terme "sport", "vitesse" ou "performance".
        - FOCUS : Concentre-toi sur le LUXE, le CONFORT, le SILENCE et le PRESTIGE.
        - AVANTAGE : L'Audi A4 Break est choisie pour son confort souverain et son grand coffre idéal pour les valises, tout en restant une voiture de maître.
        - SERVICES : Privé VIP, Aéroports (Marseille, Nice, Toulon), Gares, et Taxi Conventionné CPAM (même en transport médical, nous offrons le prestige de l'Audi).
        
        OBJECTIFS :
        - Informer sur les services de transport avec un vocabulaire riche (sérénité, raffinement, excellence).
        - Rappeler que l'intérieur est en cuir avec une ambiance feutrée.
        - Inciter à la réservation sereine via le site ou par appel.
        
        Réponds exclusivement en français.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Je vous prie d'accepter mes excuses. Un imprévu technique m'empêche de vous assister. Je vous invite à nous contacter par téléphone pour un service immédiat.";
  }
};
