const path = require("path");
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
  HTTP_STATUS_ERROR_UNAUTHORIZED,
} = require("../../public/assets/scripts/const");
const logger = require("../logger");

const postLogin = async (req, res) => {
  res.status(HTTP_STATUS_OK).end();
};

const postLoginFailed = async (req, res) => {
  const message = { message: req.session.messages[req.session.messages.length - 1] };
  res.status(HTTP_STATUS_ERROR_UNAUTHORIZED).send(message);
};

const getLoginPage = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.sendFile(path.join(__dirname, "../../private/login.html"));
    }
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

module.exports = { postLogin, postLoginFailed, getLoginPage };
