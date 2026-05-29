const express = require("express");

const apiKeyAuth = require(
  "../middleware/apiKeyAuth"
);

const rateLimiter = require(
  "../middleware/rateLimiter"
);

const router = express.Router();

router.get(
  "/data",

  apiKeyAuth,

  rateLimiter,

  async (req, res) => {

    res.json({
      success: true,

      message:
        "Gateway access granted",

      tenant: {
        id: req.tenant.id,
        name: req.tenant.name,
        plan: req.tenant.plan,
      },
    });

  }
);

module.exports = router;