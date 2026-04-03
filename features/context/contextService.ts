import { UserContext } from "../../store/useAppStore";

export const generatePrompt = (userData: any) => {
  return `You are a world-class health optimization doctor. 

I am providing my baseline health data and target problems below. 
IMPORTANT: Do NOT generate the final health protocol immediately. 

STEP 1: Review my data.
STEP 2: Ask me 3 to 5 highly specific, diagnostic questions about my 'problems' and lifestyle to uncover root causes. 
STEP 3: Wait for my response. 
STEP 4: Only AFTER I answer your questions, generate the final structured HEALTH PROTOCOL.

USER DATA:
${JSON.stringify(userData, null, 2)}

When you are ready to output the final protocol in Step 4, you MUST return ONLY a strictly valid JSON object matching this exact structure (no markdown formatting, just raw JSON):

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
