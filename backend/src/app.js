const express = require("express");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"))
app.use("/auth", authRoutes);
app.use("/api", postRoutes);
app.get("/*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
