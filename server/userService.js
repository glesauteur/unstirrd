"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Add new user to the DB
const findUserById = async (id) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("unstirrd");

    return await db.collection("users").findOne(ObjectId(id));
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};

// Add new user to the DB
const findOrCreateByGoogleId = async (profile) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("unstirrd");

    const result = await db.collection("users").findOneAndUpdate(
      { googleId: profile.id },
      {
        $setOnInsert: {
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          picture: profile.photos[0].value,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    return result.value;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};

module.exports = { findOrCreateByGoogleId, findUserById };
