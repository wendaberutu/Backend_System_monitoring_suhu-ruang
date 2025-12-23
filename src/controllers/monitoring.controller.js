const Model = require("../models/monitoring.model");

const getDashboardData = async (req, res, next) => {
  try {
    const data = await Model.getLatestPerAlat();
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboardData };
