const express = require("express");
const router = express.Router();

const { getDB } = require("./database");

router.get("/", async (req, res) => {
  const db = getDB();

  const query = req.query.q;

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
    measure: req.body.measure,
  };

  const data = await db.collection("cocktails").insertOne(newCocktail);

  res.status(200).json({ newCocktail: newCocktail });
});

module.exports = router;
