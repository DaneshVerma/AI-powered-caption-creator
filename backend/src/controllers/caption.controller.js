const generateCaption = require("../services/ai.service");

async function createCaptionController(req, res) {
  try {
    const file = req.file;

    // A check for the file and its buffer.
    if (!file || !file.buffer || file.buffer.length === 0) {
      return res
        .status(400)
        .json({ error: "No image file or an empty file buffer was provided." });
    }

    const { language, mood, tone, emojis, hashtags } = req.body;

    const userOptions = {
      language: language,
      mood: mood,
      tone: tone,
      // Convert string values "true" or "false" to proper booleans
      emojis: emojis === "true",
      hashtags: hashtags === "true",
    };

    // Pass the raw image buffer to the service
    const caption = await generateCaption(file.buffer, userOptions);
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;
    res.status(201).json({
      caption: caption,
      image: base64Image,
    });
  } catch (error) {
    console.error("Error creating caption:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
}

module.exports = {
  createCaptionController,
};
