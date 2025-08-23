const express = require("express");
const authmiddleware = require("../middlewares/auth.middleware");
const { createPostController } = require("../controllers/post.controller");

const router = express.Router();

router.post("/", authmiddleware, createPostController);

module.exports = router;
