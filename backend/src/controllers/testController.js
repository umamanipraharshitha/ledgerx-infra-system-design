const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: "Controller Working",
  });
};

module.exports = {
  healthCheck,
};