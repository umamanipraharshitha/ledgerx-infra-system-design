const prisma = require("../config/db");

const generateApiKey = require(
  "../utils/generateApiKey"
);

const createApiKey = async (
  req,
  res
) => {
  try {
    const tenantId = req.user.tenantId;

    const { name } = req.body;

    const {
      rawKey,
      hashedKey,
      prefix,
    } = generateApiKey();

    await prisma.apiKey.create({
      data: {
        tenantId,
        name,
        keyHash: hashedKey,
        prefix,
      },
    });

    return res.json({
      success: true,
      apiKey: rawKey,
      message:
        "Store this key securely. It won't be shown again.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getApiKeys = async (
  req,
  res
) => {
  try {
    const tenantId = req.user.tenantId;

    const keys =
      await prisma.apiKey.findMany({
        where: {
          tenantId,
        },
        select: {
          id: true,
          name: true,
          prefix: true,
          revoked: true,
          createdAt: true,
          lastUsedAt: true,
        },
      });

    return res.json({
      success: true,
      keys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createApiKey,
  getApiKeys,
};