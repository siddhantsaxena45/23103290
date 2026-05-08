const axios = require("axios");

const registerAndAuth = async () => {
  try {
    const registerRes = await axios.post(
      "http://4.224.186.213/evaluation-service/register",
      {
        email: "23103290@mail.jiit.ac.in",
        name: "Siddhant Saxena",
        mobileNo: "6397767617",
        githubUsername: "siddhantsaxena45",
        rollNo: "23103290",
        accessCode: "MdprhE",
      }
    );

    console.log(registerRes.data);

    const authRes = await axios.post(
      "http://4.224.186.213/evaluation-service/auth",
      {
        email: "23103290@mail.jiit.ac.in",
        name: "Siddhant Saxena",
        rollNo: "23103290",
        accessCode: "MdprhE",
        clientID: registerRes.data.clientID,
        clientSecret: registerRes.data.clientSecret,
      }
    );

    return authRes.data.access_token;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

module.exports = registerAndAuth;