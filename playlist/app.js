const express = require("express");

const routes = require("./src/routes");

const app = express();

// BODY PARSER
// handle raw json
app.use(express.json());
// handle form data
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api", routes);

module.exports = app;
