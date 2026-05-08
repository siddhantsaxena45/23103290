const axios = require("axios");

let AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzEwMzI5MEBtYWlsLmppaXQuYWMuaW4iLCJleHAiOjE3NzgyMzI3OTQsImlhdCI6MTc3ODIzMTg5NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijk0Yjg4YWZkLWYwYjQtNGNkMy04MTkxLWJjOTZlMWExYjk4ZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNpZGRoYW50IHNheGVuYSIsInN1YiI6IjI3YWEyNTc5LTEyZTYtNGE2ZS1hODMzLWVkOTIwZjFjNGEwNSJ9LCJlbWFpbCI6IjIzMTAzMjkwQG1haWwuamlpdC5hYy5pbiIsIm5hbWUiOiJzaWRkaGFudCBzYXhlbmEiLCJyb2xsTm8iOiIyMzEwMzI5MCIsImFjY2Vzc0NvZGUiOiJNZHByaEUiLCJjbGllbnRJRCI6IjI3YWEyNTc5LTEyZTYtNGE2ZS1hODMzLWVkOTIwZjFjNGEwNSIsImNsaWVudFNlY3JldCI6IllLV1pEVHhDZmZHR2RtcVEifQ.FbHSICoGrMmbPZ8LPbbXNlig5T7UMGnPADsJ7dB0ToM";

const setAuthToken = (token) => {
  AUTH_TOKEN = token;
};

const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );

    console.log("Log sent");
  } catch (error) {
    console.log("Logging failed");
  }
};

module.exports = {
  Log,
  setAuthToken,
};