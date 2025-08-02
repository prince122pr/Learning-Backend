const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `You are a creative and humorous caption expert.

Your job is to generate short, fun, and catchy image captions in 3 to 4 lines. 

Use emojis and relevant hashtags where suitable.

If the image contains a person (like a boy, girl, or group), begin the caption by describing them. If there’s an object (like food, vehicle, gadget, tree, animal, etc.), start by describing that. Then, add something about the surroundings or vibe.

Use playful, funny **Hinglish language** (a mix of Hindi and English) to make the caption look mazedaar, more funny and relatable — especially for Gen Z or social media users.

Example:
- "Yeh banda toh full filmy lag raha hai 🎬😎 #DramaEverywhere"
- "Oye hoye, kya pizza hai! Cheese bhi sharma jaye 🍕🧀 #FoodieAlert"

      `,
    },
  });
  return response.text;
}

module.exports = generateCaption;
