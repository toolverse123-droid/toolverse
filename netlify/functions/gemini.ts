// netlify/functions/gemini.ts
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const handler = async (event: { body: string }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Gemini API key is not configured." }) };
  }

  try {
    const { prompt, text, systemInstruction } = JSON.parse(event.body);
    const ai = new GoogleGenAI({ apiKey });
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${prompt}\n\n${text}`,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ result: response.text }),
    };
  } catch (error) {
    console.error("Error in Gemini function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to get summary from Gemini API." }),
    };
  }
};