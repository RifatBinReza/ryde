/**
 * Importing third party libraries
 */
require("dotenv").config(); //Load environment variables to access from process.env
const chalk = require("chalk");
const cors = require("cors");
const express = require("express");
// const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");

/**
 * Require essentials like routes, models, controllers etc
 */
const { connectDB } = require("./models");

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * API Routes
 */
// secure your private routes with jwt authentication middleware


/**
 * Error Handler.
 */
app.get("*", (req, res) => {
  console.log('at least here')
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}

/**
 * Connect the database and start Express server.
 */
connectDB(process.env.DATABASE_URL).then(() => {
  let server = app.listen(app.get("port"), () => {
    console.log(
      "%s App is running at %s:%d in %s mode",
      chalk.green("✓"),
      app.get("host"),
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
});

module.exports = app;
