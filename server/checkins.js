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

  res.status(200).json({ checkin: checkin });
});

router.get("/", async (req, res) => {
  const db = getDB();

  const data = await db
    .collection("checkins")
    .aggregate([
      {
        $match: { userId: req.user._id },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "cocktails",
          localField: "cocktailId",
          foreignField: "_id",
          as: "cocktail",
        },
      },
    ])
    .toArray();

  const checkins = await Promise.all(
    data.map(async (checkin) => {
      const res = await fetch(
        `https://api.foursquare.com/v3/places/${checkin.locationFsId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: FS_TOKEN,
          },
        }
      );

      const location = await res.json();

      console.log(location);

      return {
        rating: checkin.rating,
        user: checkin.user,
        cocktail: checkin.cocktail,
        location,
      };
    })
  );

  res.status(200).json({ checkins });
});

module.exports = router;
