const express = require("express");

const protect = require("../middleware/authMiddleware");
const attachTenant = require("../middleware/tenantMiddleware");
const billingLogger = require("../middleware/billingLogger");

const {
  upgradePlan,
} = require("../controllers/subscriptionController");

const router = express.Router();

router.post(
  "/upgrade",
  protect,
  attachTenant,
  billingLogger,
  upgradePlan
);

module.exports = router;