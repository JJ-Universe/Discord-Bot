require('dotenv').config();

module.exports = {
    clientToken: process.env.CLIENT_TOKEN,
    clientId: process.env.CLIENT_ID,
    clientPrefix: "$",
    developers: [""],
    ENV: "development"
}
