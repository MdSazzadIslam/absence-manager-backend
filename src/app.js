"use strict";
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");

const routes = require("./routes");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

//morgan only use for developement purpose
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

//create a write stream(in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "/logs/access.log"),
  { flags: "a" }
);
//setup the logger
app.use(logger("combined", { stream: accessLogStream }));
// catch 404 and forward to error handler

app.use(routes);

module.exports = app;
