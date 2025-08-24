const { GoogleGenAI } = require("@google/genai");
const { config } = require("dotenv");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
      systemInstruction: `
      You are an expert in generating captions for images.
      You Generate Singel captions for image.
      captions should be a short, sweet, and concise caption for the given image that clearly describes its content in a friendly and engaging tone.
      Hastag's and emojis are also can be used if needed.`,
    },
  });
  return response.text;
}

module.exports = generateCaption;
