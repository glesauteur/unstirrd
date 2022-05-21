const express = require("express");
const router = express.Router();

const { ObjectId } = require("bson");

const { getDB } = require("./database");

router.get("/", async (req, res) => {
  const db = getDB();

  const query = req.query.q;

  // To look for cocktails in our collection, we use the autocomplete MongoDB index.
  const cocktails = await db
    .collection("cocktails")
    .aggregate([
      {
        $search: {
          index: "cocktailSearch",
          autocomplete: {
            path: "drinkName",
            query: query,
          },
        },
      },
      {
        $limit: 10,
      },
    ])
    .toArray();

  res.status(200).json({ cocktails: cocktails });
});

router.post("/", async (req, res) => {
  const db = getDB();

  const newCocktail = {
    idDrink: null,
    drinkName: req.body.drinkName,
    drinkCateogry: null,
    alcoholic: true,
    glass: req.body.glass,
    instructions: req.body.instructions,
    image: null,
    ingredients: req.body.ingredients,
    mesure: req.body.measure,
  };

  const data = await db.collection("cocktails").insertOne(newCocktail);

  res.status(200).json({ newCocktail: newCocktail });
});

router.get("/:cocktailId", async (req, res) => {
  const id = req.params.cocktailId;

  const db = getDB();

  let totalRating = 0;

  let averageRating = 0;

  // all checkins for that cocktail
  const cocktailCheckins = await db
    .collection("checkins")
    .find({ cocktailId: ObjectId(id) })
    .toArray();

  // calculate average
  const ratings = cocktailCheckins.forEach((cocktail) => {
    totalRating += cocktail.rating;
  });

  averageRating = parseFloat(totalRating / cocktailCheckins.length).toFixed(1);

  // get cocktail details from DB
  const cocktail = await db
    .collection("cocktails")
    .findOne({ _id: ObjectId(id) });

  res.status(200).json({
    cocktail: cocktail,
    averageRating: averageRating,
    checkins: cocktailCheckins,
    totalCheckins: cocktailCheckins.length,
  });
});

module.exports = router;
