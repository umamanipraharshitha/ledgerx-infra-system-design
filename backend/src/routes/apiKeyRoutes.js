const express = require("express");

const protect = require(
  "../middleware/authMiddleware"
);

const {
  createApiKey,
  getApiKeys,
} = require(
  "../controllers/apiKeyController"
);

const router = express.Router();

router.post(
  "/create",
  protect,
  createApiKey
);

router.get(
  "/",
  protect,
  getApiKeys
);

module.exports = router;