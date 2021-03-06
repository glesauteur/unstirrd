"use strict";

const express = require("express");
const setupAuthMiddlewares = require("./auth");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;
const { connect } = require("./database");

const cocktailsRouter = require("./cocktails");
const checkinsRouter = require("./checkins");
const locationsRouter = require("./locations");
const usersRouter = require("./users");

setupAuthMiddlewares(app);

app.use(bodyParser.json());

app.use("/api/cocktails", cocktailsRouter);

app.use("/api/checkins", checkinsRouter);

app.use("/api/locations", locationsRouter);

app.use("/api/users", usersRouter);

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
    name: req.user.name,
    picture: req.user.picture,
  });
});

async function main() {
  await connect();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
