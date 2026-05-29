const prisma = require("../config/db");

const getBillingSummary = async (req, res) => {
  try {
    const tenantId = req.user?.tenantId;

    if (!tenantId) {
      return res.status(401).json({
        success: false,
        message: "Tenant not found",
      });
    }

    const usages = await prisma.usage.findMany({
      where: { tenantId },
    });

    const totalCost = usages.reduce((sum, u) => sum + u.cost, 0);

    const totalRequests = usages.length;

    // breakdown per endpoint
    const breakdown = {};

    usages.forEach((u) => {
      if (!breakdown[u.endpoint]) {
        breakdown[u.endpoint] = {
          count: 0,
          cost: 0,
        };
      }

      breakdown[u.endpoint].count += 1;
      breakdown[u.endpoint].cost += u.cost;
    });

    res.json({
      success: true,
      data: {
        totalRequests,
        totalCost,
        breakdown,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getBillingSummary,
};