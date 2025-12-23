const express = require("express");
const cors = require("cors");
const monitoringRoutes = require("./routes/monitoring.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/monitoring", monitoringRoutes);
app.use(errorHandler);

module.exports = app;
