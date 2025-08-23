const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");

async function createPostController(req, res) {
  const file = req.file;
  console.log(file);
  const b64image = new Buffer.from(file.buffer).toString("base64");
  const caption = await generateCaption(b64image);
  res
    .json({
      caption:caption
    })
    .status(300);
}

module.exports = {
  createPostController,
};
