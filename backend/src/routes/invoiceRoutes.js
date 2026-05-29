const express = require("express");

const protect = require("../middleware/authMiddleware");
const attachTenant = require("../middleware/tenantMiddleware");
const billingLogger = require("../middleware/billingLogger");

const {
  getMonthlyInvoice,
} = require("../controllers/invoiceController");

const router = express.Router();

router.get(
  "/monthly",
  protect,
  attachTenant,
  billingLogger,
  getMonthlyInvoice
);

module.exports = router;