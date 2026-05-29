const { getTenantBalance } = require("../services/balanceService");

const getBalance = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

    const data = await getTenantBalance(tenantId);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getBalance,
};