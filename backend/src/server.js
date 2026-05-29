const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const usageLogger = require("./middleware/usageLogger");

app.use(usageLogger);
const billingLogger = require("./middleware/billingLogger");

app.use(billingLogger);
const billingRoutes = require("./routes/billingRoutes");

app.use("/api/billing", billingRoutes);

const subscriptionRoutes = require("./routes/subscriptionRoutes");

app.use("/api/subscription", subscriptionRoutes);

const invoiceRoutes = require("./routes/invoiceRoutes");

app.use("/api/invoice", invoiceRoutes);