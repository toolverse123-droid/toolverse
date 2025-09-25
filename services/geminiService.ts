
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAi = (): GoogleGenAI => {
    if (!process.env.API_KEY) {
      throw new Error("Gemini API key is not configured.");
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}

export const summarizeText = async (text: string, prompt: string, systemInstruction: string): Promise<string> => {
  try {
    const generativeAi = getAi();
    const response: GenerateContentResponse = await generativeAi.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${prompt}\n\n${text}`,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error summarizing text:", error);
    if (error instanceof Error && error.message.includes("Gemini API key is not configured")) {
        throw error;
    }
    throw new Error("Failed to get summary from Gemini API.");
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const generativeAi = getAi();
    const response = await generativeAi.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error && error.message.includes("Gemini API key is not configured")) {
        throw error;
    }
    throw new Error("Failed to generate image from Gemini API.");
  }
};
