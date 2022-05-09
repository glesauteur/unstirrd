const { ObjectId } = require("bson");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const { getDB } = require("./database");

const { FS_TOKEN } = process.env;

router.post("/", async (req, res) => {
  const db = getDB();

  const checkin = {
    userId: ObjectId(req.body.userId),
    locationFsId: req.body.locationId,
    cocktailId: ObjectId(req.body.cocktailId),
    rating: req.body.rating,
  };

  const data = await db.collection("checkins").insertOne(checkin);

  const locationData = await fetch(
    `https://api.foursquare.com/v3/places/${req.body.locationId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: FS_TOKEN,
      },
    }
  );

  const location = await locationData.json();

  res.status(200).json({ checkin: checkin });
});

module.exports = router;
