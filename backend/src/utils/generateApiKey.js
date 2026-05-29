const crypto = require("crypto");

const generateApiKey = () => {
  const rawKey =
    `lx_${crypto.randomBytes(24).toString("hex")}`;

  const prefix = rawKey.slice(0, 12);

  const hashedKey = crypto
    .createHash("sha256")
    .update(rawKey)
    .digest("hex");

  return {
    rawKey,
    hashedKey,
    prefix,
  };
};

module.exports = generateApiKey;