const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(express.json());

app.get("/firestore", async (req, res) => {
  try {
    const response = await axios.get(
      "https://firestore.googleapis.com/v1/projects/gotask-973a8/databases/(default)/documents/users?key=AIzaSyDg0a3RsAo0iIaAJzwTjd7vHvGLWXqzZ00"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Firestore API" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
