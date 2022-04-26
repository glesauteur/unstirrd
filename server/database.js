const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

let db;

const connect = async function () {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = await new MongoClient(MONGO_URI, options);
  await client.connect();
  db = client.db("unstirrd");
};

const getDB = () => {
  if (db) {
    return db;
  } else {
    throw new Error("Could not connect to Database");
  }
};

exports.connect = connect;
exports.getDB = getDB;
