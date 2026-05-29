const prisma = require("../config/db");
const { createLedgerEntry } = require("../services/ledgerService");

const addCredits = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    // 💰 Ledger credit entry
    await createLedgerEntry({
      tenantId,
      type: "CREDIT",
      amount: amount,
      description: "Wallet top-up",
      referenceId: "MANUAL_TOPUP",
    });

    res.json({
      success: true,
      message: "Credits added successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCredits,
};