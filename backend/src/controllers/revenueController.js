const prisma = require("../config/db");

const getRevenue = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

    const entries = await prisma.ledgerEntry.findMany({
      where: {
        tenantId,
        type: {
          in: ["CREDIT", "SUBSCRIPTION_PAYMENT"],
        },
      },
    });

    const revenue = entries.reduce((sum, e) => {
      return sum + e.amount;
    }, 0);

    res.json({
      success: true,
      revenue,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getRevenue };