const razorpay = require("../config/razorpay");

const createCheckoutSession = async (
  req,
  res
) => {
  try {
    const tenantId = req.user.tenantId;

    const { plan } = req.body;

    const prices = {
      PRO: 1000,
      ENTERPRISE: 5000,
    };

    if (!prices[plan]) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    const order =
      await razorpay.orders.create({
        amount: prices[plan],
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          tenantId,
          plan,
        },
      });

    return res.json({
      success: true,
      order,
      key:
        process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCheckoutSession,
};