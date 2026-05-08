const axios = require("axios");

const registerAndAuth = async () => {
  try {
    const authRes = await axios.post(
      "http://4.224.186.213/evaluation-service/auth",
      {
        email: "23103290@mail.jiit.ac.in",
        name: "siddhant saxena",
        rollNo: "23103290",
        accessCode: "MdprhE",

        clientID:
          "27aa2579-12e6-4a6e-a833-ed920f1c4a05",

        clientSecret:
          "YKWZDTxCffGGdmqQ",
      }
    );

    console.log("TOKEN GENERATED");

    return authRes.data.access_token;
  } catch (error) {
    console.log(
      error.response?.data || error.message
    );
  }
};

module.exports = registerAndAuth;