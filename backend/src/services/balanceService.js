const prisma = require("../config/db");

const getTenantBalance = async (tenantId) => {
  try {
    const entries = await prisma.ledgerEntry.findMany({
      where: { tenantId },
    });

    const balance = entries.reduce((sum, entry) => {
      return sum + entry.amount;
    }, 0);

    return {
      tenantId,
      balance,
      currency: "USD",
    };
  } catch (error) {
    console.error("Balance error:", error.message);
    throw error;
  }
};

module.exports = {
  getTenantBalance,
};