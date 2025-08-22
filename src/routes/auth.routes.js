const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await userModel.findOne({ username: username });

  if (existingUser)
    return res.status(409).json({
      message: "username already exist",
    });

  try {
    const newUser = await userModel.create({
      username,
      password,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    return res.json({
      message: "user created succesfully",
      newUser,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {});

module.exports = router;
