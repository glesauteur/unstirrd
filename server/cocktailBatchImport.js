const { MongoClient } = require("mongodb");
const assert = require("assert");
const fetch = require("cross-fetch");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = await new MongoClient(MONGO_URI, options);

  let alphabet = "abcdefghijklmnopqrstuvwxyz";

  let newArray = [];

  // Importing all cocktails from the Cocktail DB API to our MongoDB
  for (let i = 0; i < alphabet.length; i++) {
    let response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${alphabet[i]}`
    );

    console.log(
      `[Cocktail Import] Importing cocktails starting with letter ${alphabet[i]}`
    );

    let cocktails = await response.json();

    if (!cocktails.drinks) {
      continue;
    }

    let dbCocktails = cocktails.drinks.map((cocktail) => {
      return {
        idDrink: cocktail.idDrink,
        drinkName: cocktail.strDrink,
        drinkCategory: cocktail.strCategory,
        alcoholic: cocktail.strAlcoholic === "Alcoholic" ? true : false,
        glass: cocktail.strGlass,
        instructions: cocktail.strInstructions,
        image: cocktail.strDrinkThumb,
        ingredients: [
          cocktail.strIngredient1,
          cocktail.strIngredient2,
          cocktail.strIngredient3,
          cocktail.strIngredient4,
          cocktail.strIngredient5,
          cocktail.strIngredient6,
          cocktail.strIngredient7,
          cocktail.strIngredient8,
          cocktail.strIngredient9,
          cocktail.strIngredient10,
          cocktail.strIngredient11,
          cocktail.strIngredient12,
          cocktail.strIngredient13,
          cocktail.strIngredient14,
          cocktail.strIngredient15,
        ].filter((i) => i),
        mesure: [
          cocktail.strMeasure1,
          cocktail.strMeasure2,
          cocktail.strMeasure3,
          cocktail.strMeasure4,
          cocktail.strMeasure5,
          cocktail.strMeasure6,
          cocktail.strMeasure7,
          cocktail.strMeasure8,
          cocktail.strMeasure9,
          cocktail.strMeasure10,
          cocktail.strMeasure11,
          cocktail.strMeasure12,
          cocktail.strMeasure13,
          cocktail.strMeasure14,
          cocktail.strMeasure15,
        ].filter((m) => m),
      };
    });

    try {
      await client.connect();
      const db = client.db("unstirrd");

      const newCocktails = await db
        .collection("cocktails")
        .insertMany(dbCocktails);
      assert.equal(newCocktails.insertedCount, dbCocktails.length);
    } catch (err) {
      console.log(err);
    }
  }
  client.close();
};

batchImport();
