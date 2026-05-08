const express = require("express");
const registerAndAuth = require("./config/auth");

const app = express();

app.use(express.json());

const startServer = async () => {
  const token = await registerAndAuth();

  console.log("TOKEN:");
  console.log(token);

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

startServer();