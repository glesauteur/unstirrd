const express = require("express");
const router = express.Router();

const { getDB } = require("./database");

router.get("/search", async (req, res) => {
  // ...
});

router.get("/:locationFsId", async (req, res) => {
  const db = getDB();

  let totalRating = 0;

  let averageRating = 0;

  // all checkins for that location
  const locationCheckins = await db
    .collection("checkins")
    .find({ locationFsId: req.params.locationFsId })
    .toArray();

  // calculate average
  const ratings = locationCheckins.forEach((location) => {
    totalRating += location.rating;
  });

  averageRating = parseFloat(totalRating / locationCheckins.length).toFixed(1);

  // get location details from FS
  res.status(200).json({
    name: "Darling",
    address: "...",
    categories: [],
    averageRating: averageRating,
    checkins: locationCheckins,
    totalCheckins: locationCheckins.length,
  });
});

router.get("/:locationFsId/checkins", async (req, res) => {
  // All cocktail reviews for a location

  const db = getDB();

  const locationCocktails = await db
    .collection("checkins")
    .aggregate([
      {
        $match: { locationFsId: req.params.locationFsId },
      },
      {
        $lookup: {
          from: "cocktails",
          localField: "cocktailId",
          foreignField: "_id",
          as: "cocktail",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ])
    .toArray();

  res.status(200).json({ locationCocktails });
});

module.exports = router;
