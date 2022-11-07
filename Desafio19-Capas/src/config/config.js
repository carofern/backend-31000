const path = require("path");
require("dotenv").config();

const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`;
const port = process.env.PORT || 8080;
const sessionSecret = process.env.SESSION_SECRET || "secret1234";
const sessionMaxAge = +process.env.SESSION_MAXAGE || 1000 * 60 * 10; // session max age in miliseconds

module.exports = {
  mongoUrl,
  port,
  sessionSecret,
  sessionMaxAge,
};
