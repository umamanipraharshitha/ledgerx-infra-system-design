const prisma = require("../config/db");

const simulatePayment = async (req, res) => {
  try {
    const { tenantId, amount } = req.body;

    // fake Razorpay payment object
    const fakeEvent = {
      event: "payment.captured",
      payload: {
        payment: {
          entity: {
            id: "pay_" + Date.now(),
            amount: amount * 100,
            notes: {
              tenantId,
            },
          },
        },
      },
    };

    const payment = fakeEvent.payload.payment.entity;

    // check duplicate (idempotency)
    const exists = await prisma.ledgerEntry.findFirst({
      where: { referenceId: payment.id },
    });

    if (exists) {
      return res.json({ success: true, message: "Already processed" });
    }

    // create ledger entry
    await prisma.ledgerEntry.create({
      data: {
        tenantId,
        type: "CREDIT",
        amount: amount,
        currency: "INR",
        description: "Simulated payment",
        referenceId: payment.id,
      },
    });

    res.json({
      success: true,
      message: "Payment simulated + ledger updated",
      paymentId: payment.id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { simulatePayment };