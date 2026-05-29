const express = require("express");
const router = express.Router();

const { simulatePayment } = require("../controllers/simulateController");

router.post("/payment", simulatePayment);

module.exports = router;