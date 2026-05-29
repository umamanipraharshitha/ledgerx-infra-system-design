const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getRevenue } = require("../controllers/revenueController");

const router = express.Router();

router.get("/", protect, getRevenue);

module.exports = router;