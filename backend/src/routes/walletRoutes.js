const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  addCredits,
} = require("../controllers/walletController");

const router = express.Router();

router.post("/add", protect, addCredits);

module.exports = router;