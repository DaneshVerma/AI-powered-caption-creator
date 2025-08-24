const { GoogleGenAI } = require("@google/genai");
const { config } = require("dotenv");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateCaption(base64ImageFile, options = {}) {
  const {
    language = "English",
    mood = "friendly",
    tone = "engaging",
    emojis = false,
    hashtags = false,
  } = options;
  const contents = [
    {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
    {
      text: `
      Generate a single caption for this image. 
      Preferences:
      - Language: ${language}
      - Mood: ${mood}
      - Tone: ${tone}
      - Emojis: ${emojis ? "Yes" : "No"}
      - Hashtags: ${hashtags ? "Yes" : "No"}
      `,
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
      You are an expert in generating creative captions for images.
      Always generate one concise caption describing the image accurately.
      
      The style must follow user preferences:
      - Language choice
      - Mood
      - Tone
      - Emoji inclusion
      - Hashtag inclusion
      
      If preferences are missing, default to short, simple, and friendly captions in English without emojis or hashtags.
      `,
    },
  });
  return response.text;
}

module.exports = generateCaption;
