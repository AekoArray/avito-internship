const express = require("express");
const axios = require("axios");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", async (req, res) => {
  const response = await axios
    .get("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
    .then((resp) => resp.data);
  res.json({ message: response });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
