const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("node:fs");
const path = require("node:path");
const router = require("./router");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    optionsSuccessStatus: 200,
  })
);

app.use(express.static(path.join(__dirname, "../public")));

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

module.exports = app;

const reactBuildPath = `${__dirname}/../../frontend/dist`;

app.use(express.static(reactBuildPath));

app.get("*", (req, res) => {
  res.sendFile(`${reactBuildPath}/index.html`);
});

const logErrors = (err, req, res, next) => {
  console.error(err);
  console.error("on req:", req.method, req.path);

  next(err);
};

app.use(logErrors);

module.exports = app;
