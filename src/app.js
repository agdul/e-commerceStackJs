const express = require("express");
const morgan = require("morgan");
const router = require("./routes/main");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/", router);

// Enable CORS for all routes
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
