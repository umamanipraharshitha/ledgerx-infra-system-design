const attachTenant = (req, res, next) => {
  try {
    // authMiddleware already sets req.user
    if (!req.user || !req.user.tenantId) {
      return res.status(401).json({
        success: false,
        message: "Tenant not found in token",
      });
    }

    req.tenantId = req.user.tenantId;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = attachTenant;