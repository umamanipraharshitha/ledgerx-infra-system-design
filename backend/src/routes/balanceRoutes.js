const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getBalance,
} = require("../controllers/balanceController");

const router = express.Router();

router.get("/", protect, getBalance);

module.exports = router;