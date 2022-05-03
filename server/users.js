const { ObjectId } = require("bson");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const { getDB } = require("./database");
const { FS_TOKEN } = process.env;

router.get("/", async (req, res) => {});

router.get("/:userId", async (req, res) => {
  const db = getDB();

  const id = req.params.userId;

  const user = await db.collection("users").findOne({
    _id: ObjectId(id),
  });

  res.status(200).json({ user });
});

router.get("/:userId/checkins", async (req, res) => {
  const db = getDB();

  const data = await db
    .collection("checkins")
    .aggregate([
      {
        $match: { userId: ObjectId(req.params.userId) },
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

router.get("/:userId", async (req, res) => {
  const db = getDB();

  const id = req.params.userId;

  const user = await db.collection("users").findOne({
    _id: ObjectId(id),
  });

  res.status(200).json({ user });
});

router.post("/:userId/following", async (req, res) => {
  const db = getDB();

  if (req.params.userId !== req.user._id.toString()) {
    return res.sendStatus(403);
  }

  const data = await db.collection("follows").insertOne({
    from: ObjectId(req.params.userId),
    to: ObjectId(req.body.toUserId),
  });

  res.sendStatus(200);
});

router.delete("/:userId/unfollowing", async (req, res) => {
  const db = getDB();

  if (req.params.userId !== req.user._id.toString()) {
    return res.sendStatus(403);
  }

  const data = await db.collection("follows").deleteOne({
    from: ObjectId(req.params.userId),
    to: ObjectId(req.body.toUserId),
  });

  res.sendStatus(200);
});

module.exports = router;
