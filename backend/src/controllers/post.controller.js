const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");

async function createPostController(req, res) {
  const file = req.file;
  console.log(file);
  const b64image = new Buffer.from(file.buffer).toString("base64");
  // Extract user options from request body
  const { language, mood, tone, emojis, hashtags } = req.body;
  // Call AI service with preferences
  const caption = await generateCaption(b64image, {
    language,
    mood,
    tone,
    emojis: emojis === "true" || emojis === true,
    hashtags: hashtags === "true" || hashtags === true,
  });
  const result = await uploadFile(file);
  res.json({
    caption: caption,
    image: result.url,
  });
}

module.exports = {
  createPostController,
};
