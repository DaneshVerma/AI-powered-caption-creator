const { GoogleGenAI } = require("@google/genai");
const { config } = require("dotenv");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateCaption(imageData, options = {}) {
  // Checking if the input is a Buffer and convert it to a base64 string.
  // The API expects this format for image data.
  if (!Buffer.isBuffer(imageData)) {
    console.error(
      "Expected a Buffer for image data but received a different type."
    );
    return "Error generating caption.";
  }

  const base64Image = imageData.toString("base64");

  const {
    language = "English",
    mood = "friendly",
    tone = "engaging",
    emojis = false,
    hashtags = false,
  } = options;

  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Image, // a base64-encoded string.
      },
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

  try {
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
  } catch (error) {
    console.error(
      "Error calling Gemini API:",
      error.response?.data?.error || error.message
    );
    return "Failed to generate caption for the image.";
  }
}

module.exports = generateCaption;
