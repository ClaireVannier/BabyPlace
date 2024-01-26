const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("node:fs");
const path = require("node:path");
const router = require("./router");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", router);

const reactBuildPath = path.join(__dirname, "..", "..", "frontend", "dist");
app.use(express.static(reactBuildPath));

app.get("*", (req, res) => {
  const reactIndexFile = path.join(reactBuildPath, "index.html");
  if (fs.existsSync(reactIndexFile)) {
    res.sendFile(reactIndexFile);
  } else {
    res.status(404).send("Index file not found");
  }
});

const logErrors = (err, req, res, next) => {
  console.error(err);
  console.error("on req:", req.method, req.path);

  next(err);
};

module.exports = app;
