const express = require("express");
const authmiddleware = require("../middlewares/auth.middleware");
const { createCaptionController } = require("../controllers/caption.controller");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authmiddleware, upload.single("image"), createCaptionController);

module.exports = router;
