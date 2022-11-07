const path = require("path");
const {
  HTTP_STATUS_ERROR_BAD_REQUEST,
  HTTP_STATUS_ERROR_UNAUTHORIZED,
} = require("../../public/assets/scripts/const");
const logger = require("../logger");

const postSignup = async (req, res) => {
  res.redirect("/");
};

const getSignupPage = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../../private/signup.html"));
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

const postSignupFailed = async (req, res) => {
  const message = { message: req.session.messages[req.session.messages.length - 1] };
  res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(message);
};

module.exports = { postSignup, postSignupFailed, getSignupPage };
