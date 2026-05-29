const crypto = require("crypto");

const prisma = require("../config/db");

const apiKeyAuth = async (
  req,
  res,
  next
) => {
  try {

    const apiKey =
      req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API key missing",
      });
    }

    const hashedKey = crypto
      .createHash("sha256")
      .update(apiKey)
      .digest("hex");

    const key =
      await prisma.apiKey.findUnique({
        where: {
          keyHash: hashedKey,
        },
        include: {
          tenant: true,
        },
      });

    if (!key || key.revoked) {
      return res.status(401).json({
        success: false,
        message: "Invalid API key",
      });
    }

    req.tenant = key.tenant;

    req.apiKey = key;

    await prisma.apiKey.update({
      where: {
        id: key.id,
      },
      data: {
        lastUsedAt: new Date(),
      },
    });

    next();

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = apiKeyAuth;