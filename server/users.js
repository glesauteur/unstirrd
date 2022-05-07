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

async function getCheckinsForUser(userId) {
  const db = getDB();

  const data = await db
    .collection("checkins")
    .aggregate([
      {
        $match: { userId: ObjectId(userId) },
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

  return Promise.all(
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
}

router.get("/:userId/checkins", async (req, res) => {
  const checkins = await getCheckinsForUser(req.params.userId);
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

router.get("/:userId/followers", async (req, res) => {
  const db = getDB();

  const id = req.params.userId;

  const followers = await db
    .collection("follows")
    .aggregate([
      {
        $match: { to: ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "_id",
          as: "user",
        },
      },
    ])
    .toArray();

  const withCheckins = await Promise.all(
    followers.map(async (follower) => {
      const checkins = await getCheckinsForUser(follower.from);
      return { ...follower, checkins };
    })
  );

  res.status(200).json({ followers: withCheckins });
});

router.get("/:userId/followings", async (req, res) => {
  const db = getDB();

  const id = req.params.userId;

  const followings = await db
    .collection("follows")
    .aggregate([
      {
        $match: { from: ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "_id",
          as: "user",
        },
      },
    ])
    .toArray();

  res.status(200).json({ followings });
});

router.get("/:userId/:userFollowingId", async (req, res) => {
  const db = getDB();

  const userId = req.params.userId;
  const followingId = req.params.userFollowingId;

  const findFollow = await db
    .collection("follows")
    .findOne({ from: ObjectId(userId), to: ObjectId(followingId) });

  let isFollowing = !!findFollow;

  res.status(200).json({ isFollowing });
});

module.exports = router;
