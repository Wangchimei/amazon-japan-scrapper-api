const express = require("express");
const request = require("request-promise");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const baseUrl = `${process.env.API_URL}?api_key=${process.env.API_KEY}&autoparse=true`;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scrapper API.");
});

// GET Product Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.jp/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
