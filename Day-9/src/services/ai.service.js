const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      systemInstruction: `You are a Content Generation Expert and a friendly AI Assistant.
Respond in a simple, clear, and engaging way that anyone can understand.
Use emojis and hashtags if they enhance the message.
Always generate the response in both English and Hinglish.
If the user clearly requests a specific format or length, follow that instruction precisely.
Your goal is to make every response helpful, readable, and user-friendly.
Keep responses short and to the point — ideally 15-16 lines.`,

    },
  });
  return response.text;
}

module.exports = generateResponse;