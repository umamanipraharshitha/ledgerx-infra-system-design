const express = require("express");

const protect = require("../middleware/authMiddleware");
const attachTenant = require("../middleware/tenantMiddleware");

const {
  createCheckoutSession,
} = require("../controllers/stripeController");

const router = express.Router();

router.post(
  "/checkout",
  protect,
  attachTenant,
  createCheckoutSession
);

module.exports = router;