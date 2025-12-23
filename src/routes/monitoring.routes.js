const express = require("express");
const router = express.Router();
const controller = require("../controllers/monitoring.controller");

router.get("/dashboard", controller.getDashboardData);

module.exports = router;
