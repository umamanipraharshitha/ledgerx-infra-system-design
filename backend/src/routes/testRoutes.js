const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// public route
router.get("/public", (req, res) => {
  res.json({
    success: true,
    message: "Public route working",
  });
});

// protected route
router.get("/private", protect, (req, res) => {
  res.json({
    success: true,
    message: "Private route accessed",
    user: req.user,
  });
});

module.exports = router;