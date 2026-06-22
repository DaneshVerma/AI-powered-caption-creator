const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID);

const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await userModel.findOne({ username: username });

  if (existingUser)
    return res.status(409).json({
      message: "username already exist",
    });

  try {
    const newUser = await userModel.create({
      username: username,
      email: email,
      password: password,
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
};

const loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }
  const user = await userModel.findOne({ username: username });
  if (!user) {
    return res.status(404).json({
      message: "user does not exist Register First!",
    });
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "username or password is incorrect",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(200).json({
    message: "logged in succesfully",
  });
};

const googleController = async (req, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ message: "missing credential" });

  try {
    const ticket = await googleClient.verifyIdToken({ idToken: credential });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name || email.split("@")[0];
    // find or create user based on email
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({ username: name, email });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "jwt-secret");
    res.cookie("token", token, { httpOnly: true });
    return res.json({ message: "logged in with google" });
  } catch (err) {
    return res.status(401).json({ message: "invalid google credential", error: err.message });
  }
};

module.exports = {
  registerController,
  loginController,
  googleController,
};
