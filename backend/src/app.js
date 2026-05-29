const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const usageLogger = require("./middleware/usageLogger");
const billingLogger = require("./middleware/billingLogger");

const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const apiKeyRoutes = require("./routes/apiKeyRoutes");
const gatewayRoutes = require("./routes/gatewayRoutes");
const balanceRoutes = require("./routes/balanceRoutes");
const walletRoutes = require("./routes/walletRoutes");
const revenueRoutes = require("./routes/revenueRoutes");
const simulateRoutes = require("./routes/simulateRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/*
  JSON parser
*/
app.use(express.json());

/*
  Webhook raw body parser
*/
app.use(
  "/api/v1/stripe/webhook",
  express.raw({
    type: "application/json",
  })
);

/*
  Global middleware
*/
app.use(usageLogger);
app.use(billingLogger);

/*
  Health route
*/
app.get("/", (req, res) => {
  res.json({
    message: "LedgerX Backend Running",
  });
});

/*
  Routes
*/
app.use("/api/test", testRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/billing", billingRoutes);

app.use(
  "/api/subscription",
  subscriptionRoutes
);

app.use("/api/invoice", invoiceRoutes);

app.use("/api/stripe", stripeRoutes);

app.use("/api/keys", apiKeyRoutes);

app.use("/api/gateway", gatewayRoutes);

app.use("/api/balance", balanceRoutes);

app.use("/api/wallet", walletRoutes);

app.use("/api/revenue", revenueRoutes);

app.use("/api/simulate", simulateRoutes);

module.exports = app;