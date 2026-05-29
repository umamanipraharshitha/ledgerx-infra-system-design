const redis = require("../config/redis");

const getLimitByPlan = (plan) => {

  switch (plan) {

    case "PRO":
      return 1000;

    case "ENTERPRISE":
      return 10000;

    case "FREE":
    default:
      return 100;

  }
};

const rateLimiter = async (
  req,
  res,
  next
) => {
  try {

    const tenantId =
      req.tenant?.id ||
      req.user?.tenantId;

    if (!tenantId) {
      return next();
    }

    const plan =
      req.tenant?.plan ||
      req.tenantPlan ||
      "FREE";

    const LIMIT =
      getLimitByPlan(plan);

    const WINDOW = 60;

    const key =
      `rate:${tenantId}`;

    let requests =
      await redis.get(key);

    requests = requests
      ? parseInt(requests)
      : 0;

    if (requests >= LIMIT) {

      return res.status(429).json({
        success: false,
        message:
          `Rate limit exceeded for ${plan} plan`,
      });
    }

    await redis.multi()
      .incr(key)
      .expire(key, WINDOW)
      .exec();

    next();

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = rateLimiter;