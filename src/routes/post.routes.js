const express = require("express");
const authmiddleware = require("../middlewares/auth.middleware");
const { createPostController } = require("../controllers/post.controller");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authmiddleware, upload.single("image"), createPostController);

module.exports = router;
