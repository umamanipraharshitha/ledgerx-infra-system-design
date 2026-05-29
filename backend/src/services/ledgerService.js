const prisma = require("../config/db");

const createLedgerEntry = async ({
  tenantId,
  type,
  amount,
  description,
  referenceId,
}) => {
  try {
    const entry = await prisma.ledgerEntry.create({
      data: {
        tenantId,
        type,
        amount,
        description,
        referenceId,
      },
    });

    return entry;
  } catch (error) {
    console.error("Ledger error:", error.message);
    throw error;
  }
};

module.exports = {
  createLedgerEntry,
};