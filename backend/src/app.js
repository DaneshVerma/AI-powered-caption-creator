const express = require("express");
const authRoutes = require("./routes/auth.routes");
const captionRoutes = require("./routes/caption.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
// Redirect any browser GET requests for the old SPA '/auth' path to root
app.get(/^\/auth(?:\/.*)?$/, (req, res) => {
  if (req.method === 'GET') return res.redirect('/');
  return res.status(405).end();
});

app.use(express.static("public"));
app.use("/auth", authRoutes); // API endpoints (POST /auth/google) still handled here
app.use("/api", captionRoutes);
app.get("/*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
