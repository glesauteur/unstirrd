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

module.exports = router;
