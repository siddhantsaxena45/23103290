const express = require("express");
const cors = require("cors");
const axios = require("axios");

const registerAndAuth = require("./config/auth");

const getTopNotifications = require(
  "./services/priorityService"
);

const {
  Log,
  setAuthToken,
} = require("logging_middleware");

const app = express();

app.use(cors());
app.use(express.json());

let TOKEN = "";

app.get("/priority", async (req, res) => {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const top = getTopNotifications(
      response.data.notifications,
      10
    );

    await Log(
      "backend",
      "info",
      "route",
      "Fetched priority notifications"
    );

    res.json(top);
  } catch (error) {
    console.log(error);

    await Log(
      "backend",
      "error",
      "handler",
      "Priority API failed"
    );

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

const startServer = async () => {
  TOKEN = await registerAndAuth();

  setAuthToken(TOKEN);

  await Log(
    "backend",
    "info",
    "middleware",
    "Logger initialized"
  );

  app.listen(5000, () => {
    console.log("Server running");
  });
};

startServer();