const express = require("express");
const protect = require("../middleware/authMiddleware");
const attachTenant = require("../middleware/tenantMiddleware");
const billingLogger = require("../middleware/billingLogger");

const {
  getBillingSummary,
} = require("../controllers/billingController");

const router = express.Router();

router.get(
  "/summary",
  protect,
  attachTenant,
  billingLogger,
  getBillingSummary
);

module.exports = router;