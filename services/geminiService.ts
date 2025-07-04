import { GoogleGenAI } from "@google/genai";
import type { Recommendation } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are an expert crypto airdrop analyst from Indonesia. Your goal is to advise users on the optimal strategy for a given crypto project, protocol, or task to maximize potential airdrops.
You will be provided with Google search results to ground your answer. Base your analysis on these results and the user's input.
Your response MUST be a valid JSON object without any markdown formatting, comments, or extra text. Do not include any source citations (e.g., [1], [2]) in your response.
The JSON object must conform to this exact structure:
{
  "frequency": "Daily" | "Weekly" | "Bi-Weekly" | "Monthly" | "One-Time" | "As Needed",
  "actions": ["A clear, step-by-step action in Indonesian.", "Another action step.", "A final action step."],
  "reasoning": ["A key point about the recommendation, in Indonesian.", "Another key point.", "A final summary point."]
}
Analyze the user's input about a project or airdrop task (e.g., "ZkSync", "LayerZero bridge") and provide a recommendation based on common patterns and the provided search results. Daily tasks require "Daily" frequency. Weekly quests suggest "Weekly". Some tasks are one-time only. Be direct and clear. For reasoning and actions, break them down into short, scannable points in an array, in Indonesian.
`;

export const getAirdropRecommendation = async (projectDescription: string): Promise<Recommendation> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: `Analyze this airdrop opportunity: "${projectDescription}"`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
        tools: [{googleSearch: {}}],
      },
    });

    const responseText = response.text?.trim();

    if (!responseText) {
      const finishReason = response.candidates?.[0]?.finishReason;
      if (finishReason && finishReason !== 'STOP') {
        throw new Error(`Analysis stopped by the model due to: ${finishReason}. Please try rephrasing your request.`);
      }
      throw new Error("The AI returned an empty response. Please try again.");
    }

    let jsonStr = responseText;
    
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    let parsedData: Recommendation;
    try {
        parsedData = JSON.parse(jsonStr) as Recommendation;
    } catch (e) {
        console.error("Failed to parse JSON from AI response:", jsonStr);
        throw new Error("The AI returned a response in an invalid format. Please try again.");
    }

    if (!parsedData.frequency || !parsedData.actions || !Array.isArray(parsedData.actions) || parsedData.actions.length === 0 || !parsedData.reasoning || !Array.isArray(parsedData.reasoning) || parsedData.reasoning.length === 0) {
        throw new Error("AI response is missing required fields. Please try again.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error in getAirdropRecommendation:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unexpected error occurred while communicating with the AI.");
  }
};