const express = require("express");

const { createProxyMiddleware } = require("http-proxy-middleware");

const cors = require("cors");
const app = express();

app.use(cors());

app.use(
  ["/api/movies", "/api/movies/**"],
  createProxyMiddleware({
    target: "http://localhost:7001",
    changeOrigin: true,
  })
);

app.use(
  ["/api/playlists", "/api/playlists/**"],
  createProxyMiddleware({
    target: "http://localhost:7002",
    changeOrigin: true,
  })
);

// BODY PARSER
// handle raw json
app.use(express.json());

module.exports = app;
