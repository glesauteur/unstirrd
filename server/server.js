"use strict";

const express = require("express");
const setupAuthMiddlewares = require("./auth");
const app = express();
const port = 3001;

setupAuthMiddlewares(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/current-user", function (req, res) {
  if (req.isUnauthenticated()) {
    return res.status(401).send();
  }

  res.status(200).json({
    id: req.user._id,
    email: req.user.email,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
