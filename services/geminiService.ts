
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getProjectAdvice(projectDescription: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: projectDescription,
      config: {
        systemInstruction: "You are a world-class Electronic Systems Engineer and CTO for AXIS Silicon. Recommend high-performance electronic components (MCUs, sensors, logic ICs) and technical implementation steps for the described electronic project. Focus on reliability, frequency stability, and efficiency. Keep it professional, highly technical, and concise.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendedTools: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Technical components and hardware systems recommended."
            },
            proTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Engineering best practices for the project."
            }
          },
          required: ["summary", "recommendedTools", "proTips"]
        }
      }
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
