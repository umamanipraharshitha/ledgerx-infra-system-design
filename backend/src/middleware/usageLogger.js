const prisma = require("../config/db");

const usageLogger = async (req, res, next) => {
  try {
    // only log if tenant exists (from auth middleware)
    if (!req.user || !req.user.tenantId) {
      return next();
    }

    // fire-and-forget logging (don’t block API)
    prisma.usage.create({
      data: {
        tenantId: req.user.tenantId,
        endpoint: req.originalUrl,
        method: req.method,
      },
    }).catch((err) => {
      console.error("Usage log failed:", err.message);
    });

    next();
  } catch (error) {
    next(); // never block request
  }
};

module.exports = usageLogger;