const express = require("express");
const { googleController } = require("../controllers/auth.Controller");
const router = express.Router();

// Google-only authentication endpoint
router.post("/google", googleController);

module.exports = router;
