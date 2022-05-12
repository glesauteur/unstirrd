const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const { getDB } = require("./database");
const { FS_TOKEN } = process.env;

router.get("/search", async (req, res) => {
  let searchValue = req.query.q;
  let lat = req.query.lat;
  let long = req.query.long;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: FS_TOKEN,
    },
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/autocomplete?query=${searchValue}&ll=${lat}%2C${long}&radius=10000&limit=30&types=place`,
    options
  );

  const data = await response.json();

  const results = data.results.filter((result) => {
    return result.place.categories.some((category) => {
      return category.id >= 13000 && category.id < 14000;
    });
  });

  res.status(200).json({ results: results });
});

router.get("/:locationFsId", async (req, res) => {
  const locationFsId = req.params.locationFsId;
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
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: FS_TOKEN,
    },
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/places/${locationFsId}`,
    options
  );
  const data = await response.json();

  res.status(200).json({
    fsq_id: req.params.locationFsId,
    name: data.name,
    address: data.location.formatted_address,
    latitude: data.geocodes.main.latitude,
    longitude: data.geocodes.main.longitude,
    categories: data.categories,
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
