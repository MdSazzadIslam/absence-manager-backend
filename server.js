"use strict";
const dotenv = require("dotenv");
const connect = require("./src/config/db");
dotenv.config();
const app = require("./src/app");
const db = process.env.MONGO_URI;
(() => {
  connect(db);
})();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]:  API is running at port :${process.env.PORT}  `);
});

module.exports = app;
