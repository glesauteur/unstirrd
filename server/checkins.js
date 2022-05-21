const { ObjectId } = require("bson");
const e = require("express");
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

  await db.collection("checkins").insertOne(checkin);

  res.status(200).json({ checkin: checkin });
});

router.get("/", async (req, res) => {
  const db = getDB();

  const checkinsInfo = await db
    .collection("checkins")
    .aggregate([
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

  // To get all the details about the locations
  const checkins = Promise.all(
    checkinsInfo.map(async (checkin) => {
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

      return {
        rating: checkin.rating,
        user: checkin.user,
        cocktail: checkin.cocktail,
        location,
      };
    })
  );

  const detailedCheckins = await checkins;

  if (req.query.followingsOnly) {
    const followings = await db
      .collection("follows")
      .find({ from: req.user._id })
      .toArray();

    const followingIds = followings.map((f) => String(f.to));

    const followingOnlyCheckins = detailedCheckins.filter((checkin) => {
      return followingIds.includes(String(checkin.user[0]._id));
    });

    res.status(200).json({ checkins: followingOnlyCheckins });
  } else {
    res.status(200).json({ checkins: detailedCheckins });
  }
});

module.exports = router;
