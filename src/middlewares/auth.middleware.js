const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authmiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.json({ message: "unauthorized!!" }).status(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decoded.id });
    req.user = user;
    next();
  } catch (error) {
    return res
      .json({
        message: "invalid token please login againv",
      })
      .status(401);
  }
}

module.exports = authmiddleware;
