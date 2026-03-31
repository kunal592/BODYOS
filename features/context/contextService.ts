import { UserContext } from "../../store/useAppStore";

export const generatePrompt = (userData: any) => {
  return `You are a health optimization expert. 
Based on the following USER DATA, generate a structured HEALTH PROTOCOL.

USER DATA:
${JSON.stringify(userData, null, 2)}

OUTPUT FORMAT:
Return ONLY a strictly valid JSON object matching this structure:
{
  "userProfile": { "age": number, "gender": "string", "height": "string", "weight": number },
  "goals": ["string"],
  "problems": ["string"],
  "rootCauses": ["string"],
  "dailyProtocol": {
    "morning": ["string", "max 4 items"],
    "afternoon": ["string", "max 4 items"],
    "evening": ["string", "max 4 items"],
    "night": ["string", "max 4 items"]
  },
  "habits": ["string", "max 5 items"],
  "dietPlan": ["string"],
  "exercisePlan": ["string"],
  "bodyState": {
    "head": "bad" | "moderate" | "good",
    "neck": "bad" | "moderate" | "good",
    "back": "bad" | "moderate" | "good",
    "gut": "bad" | "moderate" | "good",
    "legs": "bad" | "moderate" | "good"
  }
}

The bodyState should reflect whether a body part is affected by the user's reported "problems". 
"bad" means major issue, "moderate" for some symptoms, "good" for no reported issues.`;
};

export const parseContext = (json: string): UserContext => {
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error("Invalid JSON Context");
  }
};
