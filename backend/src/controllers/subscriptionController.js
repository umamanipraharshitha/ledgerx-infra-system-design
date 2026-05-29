const prisma = require("../config/db");

const upgradePlan = async (req, res) => {
  try {
    const tenantId = req.user?.tenantId;
    const { plan } = req.body;

    const allowedPlans = ["FREE", "PRO", "ENTERPRISE"];

    if (!allowedPlans.includes(plan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    const updatedTenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: { plan },
    });

    res.json({
      success: true,
      message: `Plan upgraded to ${plan}`,
      tenant: updatedTenant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  upgradePlan,
};