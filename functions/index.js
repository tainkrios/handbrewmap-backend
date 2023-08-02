const express = require("express");
require("dotenv").config();
const axios = require("axios");
const functions = require("firebase-functions");

const app = express();
const apiKey = process.env.GOOGLE_API_KEY;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://handbrewmap.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/:placeId", async (req, res) => {
  const placeId = req.params.placeId;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=opening_hours&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send(`An error occurred while fetching data. ${error}`);
  }
});

app.listen(6685, () => {
  console.log(`Server listening on port 6685`);
});

exports.api = functions.https.onRequest(app);
