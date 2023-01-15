const express = require("express");

const proxy = require("express-http-proxy");

const app = express();

// BODY PARSER
// handle raw json
app.use(express.json());

app.use("/api/movies", proxy("http://localhost:7001"));
app.use("/api/playlists", proxy("http://localhost:7002"));

module.exports = app;
