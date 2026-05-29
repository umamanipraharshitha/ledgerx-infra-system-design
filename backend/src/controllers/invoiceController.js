const prisma = require("../config/db");

const getMonthlyInvoice = async (req, res) => {
  try {
    const tenantId = req.user?.tenantId;

    if (!tenantId) {
      return res.status(401).json({
        success: false,
        message: "Tenant not found",
      });
    }

    // get current month range
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);

    const usages = await prisma.usage.findMany({
      where: {
        tenantId,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    const totalRequests = usages.length;

    const totalCost = usages.reduce((sum, u) => sum + u.cost, 0);

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
      invoice: {
        month: start.toISOString().slice(0, 7),
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
  getMonthlyInvoice,
};