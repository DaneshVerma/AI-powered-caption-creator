const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");

async function createPostController(req, res) {
  const file = req.file;
  console.log(file);
  const b64image = new Buffer.from(file.buffer).toString("base64");
  const caption = await generateCaption(b64image);
  const result = await uploadFile(file);
  res.json({
    caption: caption,
    image: result.url,
  });
}

module.exports = {
  createPostController,
};
