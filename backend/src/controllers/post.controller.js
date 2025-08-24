const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");

async function createPostController(req, res) {
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
    const result = await uploadFile(file);

    // Create a new post in your database
    const newPost = await postModel.create({
      image: result.url,
      caption: caption,
      // You may also want to store other user-related data here
    });

    res.status(201).json({
      caption: newPost.caption,
      image: newPost.image,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
}

module.exports = {
  createPostController,
};
