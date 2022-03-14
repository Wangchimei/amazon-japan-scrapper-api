const express = require("express");
const request = require("request-promise");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const getScraperUrl = (key) =>
  `${process.env.API_URL}?api_key=${key}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Japan Scrapper API.");
});

// GET Product Search Results
app.get("/api/search", async (req, res) => {
  const { key, q, ads = "true" } = req.query;

  const url = `https://www.amazon.jp/s?k=${q}`;
  const encodedUrl = encodeURI(url);

  try {
    const response = await request(`${getScraperUrl(key)}&url=${encodedUrl}`);
    ads === "true"
      ? res.json(JSON.parse(response))
      : res.json(JSON.parse(response).results);
  } catch (error) {
    res.json(error);
  }
});

// GET Product Details
app.get("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { key } = req.query;

  const url = `https://www.amazon.jp/dp/${productId}`;
  try {
    const response = await request(`${getScraperUrl(key)}&url=${url}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET Product Reviews
app.get("/api/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { key } = req.query;

  const url = `https://www.amazon.jp/product-reviews/${productId}`;

  try {
    const response = await request(`${getScraperUrl(key)}&url=${url}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET Product Offers
app.get("/api/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { key } = req.query;

  const url = `https://www.amazon.jp/gp/offer-listing/${productId}`;

  try {
    const response = await request(`${getScraperUrl(key)}&url=${url}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
