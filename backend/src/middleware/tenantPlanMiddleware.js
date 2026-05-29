const prisma = require("../config/db");

const tenantPlanMiddleware = async (req, res, next) => {
  try {
    const tenantId = req.user?.tenantId;

    if (!tenantId) return next();

    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    req.tenantPlan = tenant?.plan || "FREE";

    next();
  } catch (error) {
    next();
  }
};

module.exports = tenantPlanMiddleware;