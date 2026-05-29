const prisma = require("../config/db");
const { createLedgerEntry } = require("../services/ledgerService");

const getCost = (endpoint) => {
  if (endpoint.includes("/login")) return 0.01;
  if (endpoint.includes("/register")) return 0.02;
  return 0.005;
};

const billingLogger = async (req, res, next) => {
  try {
    if (!req.user?.tenantId) return next();

    const cost = getCost(req.originalUrl);

    // Save usage (existing)
    prisma.usage.create({
      data: {
        tenantId: req.user.tenantId,
        endpoint: req.originalUrl,
        method: req.method,
        cost,
      },
    }).catch(console.error);

    // 💰 NEW: Ledger entry (IMPORTANT)
    createLedgerEntry({
      tenantId: req.user.tenantId,
      type: "USAGE_CHARGE",
      amount: -cost,
      description: `API usage: ${req.originalUrl}`,
      referenceId: req.originalUrl,
    }).catch(console.error);

    next();
  } catch (error) {
    next();
  }
};

module.exports = billingLogger;