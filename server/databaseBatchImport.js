const { MongoClient } = require("mongodb");
const { ObjectId } = require("bson");

const express = require("express");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DBbatchImport = async () => {
  const client = await new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("unstirrd");

  //   const addNewUsers = await db.collection("users").insertMany([
  //     {
  //       googleId: "marc1234567890",
  //       email: "marc@marc.com",
  //       name: "Marc-Andre",
  //     },
  //     {
  //       googleId: "clochette1234567890",
  //       email: "clochette@clochette.com",
  //       name: "Clochette",
  //     },
  //     {
  //       googleId: "dwight1234567890",
  //       email: "dwight@dwight.com",
  //       name: "Dwight",
  //     },
  //     {
  //       googleId: "michael1234567890",
  //       email: "michael@michael.com",
  //       name: "Michael",
  //     },
  //     {
  //       googleId: "pam1234567890",
  //       email: "pam@pam.com",
  //       name: "Pam",
  //     },
  //     {
  //       googleId: "kevin1234567890",
  //       email: "kevin@kevin.com",
  //       name: "Kevin",
  //     },
  //     {
  //       googleId: "ryan1234567890",
  //       email: "ryan@ryan.com",
  //       name: "Ryan",
  //     },
  //     {
  //       googleId: "erin1234567890",
  //       email: "erin@erin.com",
  //       name: "Erin",
  //     },
  //     {
  //       googleId: "angela1234567890",
  //       email: "angela@angela.com",
  //       name: "Angela",
  //     },
  //     {
  //       googleId: "oscar1234567890",
  //       email: "oscar@oscar.com",
  //       name: "Oscar",
  //     },
  //   ]);

  const marc = await db
    .collection("users")
    .findOne({ googleId: "marc1234567890" });

  const clochette = await db
    .collection("users")
    .findOne({ googleId: "clochette1234567890" });

  const dwight = await db
    .collection("users")
    .findOne({ googleId: "dwight1234567890" });

  const michael = await db
    .collection("users")
    .findOne({ googleId: "michael1234567890" });

  const pam = await db
    .collection("users")
    .findOne({ googleId: "pam1234567890" });

  const kevin = await db
    .collection("users")
    .findOne({ googleId: "kevin1234567890" });

  const ryan = await db
    .collection("users")
    .findOne({ googleId: "ryan1234567890" });

  const erin = await db
    .collection("users")
    .findOne({ googleId: "erin1234567890" });

  const angela = await db
    .collection("users")
    .findOne({ googleId: "angela1234567890" });

  const oscar = await db
    .collection("users")
    .findOne({ googleId: "oscar1234567890" });

  const gab1 = await db
    .collection("users")
    .findOne({ googleId: "116230827991041529638" });

  const gab2 = await db
    .collection("users")
    .findOne({ googleId: "62707462f13f3e18450ec3c0" });

  const cocktail1 = await db
    .collection("cocktails")
    .findOne({ idDrink: "11023" });

  //   const addNewFollows = await db.collection("follows").insertMany([
  //     {
  //       from: ObjectId(oscar._id),
  //       to: ObjectId(angela._id),
  //     },
  //     {
  //       from: ObjectId(oscar._id),
  //       to: ObjectId(gab1._id),
  //     },
  //     {
  //       from: ObjectId(gab1._id),
  //       to: ObjectId(oscar._id),
  //     },
  //     {
  //       from: ObjectId(gab1._id),
  //       to: ObjectId(marc._id),
  //     },
  //     {
  //       from: ObjectId(gab1._id),
  //       to: ObjectId(clochette._id),
  //     },
  //     {
  //       from: ObjectId(gab1._id),
  //       to: ObjectId(pam._id),
  //     },
  //     {
  //       from: ObjectId(gab1._id),
  //       to: ObjectId(angela._id),
  //     },
  //     {
  //       from: ObjectId(gab1._id),
  //       to: ObjectId(michael._id),
  //     },
  //     {
  //       from: ObjectId(michael._id),
  //       to: ObjectId(angela._id),
  //     },
  //     {
  //       from: ObjectId(marc._id),
  //       to: ObjectId(clochette._id),
  //     },
  //     {
  //       from: ObjectId(dwight._id),
  //       to: ObjectId(michael._id),
  //     },
  //     {
  //       from: ObjectId(pam._id),
  //       to: ObjectId(ryan._id),
  //     },
  //     {
  //       from: ObjectId(clochette._id),
  //       to: ObjectId(kevin._id),
  //     },
  //     {
  //       from: ObjectId(clochette._id),
  //       to: ObjectId(michael._id),
  //     },
  //     {
  //       from: ObjectId(kevin._id),
  //       to: ObjectId(angela._id),
  //     },
  //     {
  //       from: ObjectId(michael._id),
  //       to: ObjectId(pam._id),
  //     },
  //   ]);
  const addNewCheckins = await db.collection("checkins").insertMany([
    {
      userId: ObjectId(oscar._id),
      locationFsId: "4bdf009389ca76b0cfab5d5e",
      cocktailId: ObjectId("62672ad2772775494fa0d2d3"),
      rating: 1,
    },
    {
      userId: ObjectId(clochette._id),
      locationFsId: "58c8b974951e7d7e08bc6fd8",
      cocktailId: ObjectId("62672ad2772775494fa0d2df"),
      rating: 5,
    },
    {
      userId: ObjectId(marc._id),
      locationFsId: "4bdf009389ca76b0cfab5d5e",
      cocktailId: ObjectId("62672ad2772775494fa0d2d3"),
      rating: 3,
    },
    {
      userId: ObjectId(angela._id),
      locationFsId: "4bdf009389ca76b0cfab5d5e",
      cocktailId: ObjectId("62672ad2772775494fa0d302"),
      rating: 1,
    },
    {
      userId: ObjectId(pam._id),
      locationFsId: "4bdf009389ca76b0cfab5d5e",
      cocktailId: ObjectId("62672ad2772775494fa0d30c"),
      rating: 2,
    },
  ]);

  client.close();
};

DBbatchImport();
