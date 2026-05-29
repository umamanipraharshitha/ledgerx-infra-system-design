const stripe = require("../config/stripe");
const prisma = require("../config/db");
const { createLedgerEntry } = require("../services/ledgerService");

const handleStripeWebhook = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: `Webhook Error: ${err.message}`,
      });
    }

    // Prevent double processing
    const alreadyProcessed =
      await prisma.processedWebhook.findUnique({
        where: { id: event.id },
      });

    if (alreadyProcessed) {
      return res.json({ received: true });
    }

    // Save webhook id
    await prisma.processedWebhook.create({
      data: { id: event.id },
    });

    // PAYMENT SUCCESS EVENT
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const tenantId = session.metadata.tenantId;
      const amount = session.amount_total / 100;

      await createLedgerEntry({
        tenantId,
        type: "CREDIT",
        amount,
        description: "Stripe payment credit",
        referenceId: session.id,
      });
    }

    return res.json({ received: true });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  handleStripeWebhook,
};