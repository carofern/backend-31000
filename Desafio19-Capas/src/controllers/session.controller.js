const fs = require("fs");
const path = require("path");
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
  HTTP_STATUS_ERROR_UNAUTHORIZED,
} = require("../../public/assets/scripts/const");
const logger = require("../lib/logger");

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

const logoutPage =
  fs.readFileSync(path.join(__dirname, "../../public/assets/views/logout.hbs")) + "";

const getLogoutPage = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user = await req.user;
      const usuario = user.username;
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.baseUrl = "/";
        res.status(HTTP_STATUS_OK).send(logoutPage.replace("{{{body}}}", "Hasta luego " + usuario));
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    logger.error(error.message);
    res.redirect("/");
  }
};

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
  res.status(HTTP_STATUS_ERROR_UNAUTHORIZED).send(message);
};

module.exports = {
  getLogoutPage,
  postLogin,
  postLoginFailed,
  getLoginPage,
  postSignup,
  postSignupFailed,
  getSignupPage,
};
