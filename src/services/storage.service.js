const imagekit = require("imagekit");
const { default: mongoose } = require("mongoose");

const imageKit = new imagekit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

async function uploadFile(file) {
  const response = await imageKit.upload({
    fileName: new mongoose.Types.ObjectId(),
    file: file.buffer,
    folder: "CaptionCreator",
  });
  return response;
}

module.exports = uploadFile;
