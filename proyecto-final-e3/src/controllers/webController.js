const path = require("path");
const logger = require("../logger");
const { HTTP_STATUS_ERROR_BAD_REQUEST } = require("../../public/assets/scripts/const");
const { buildErrorMessage } = require("../util.js");

const getProductosPage = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../../private/productos.html"));
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

const getCartPage = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../../private/cart.html"));
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

const getProfilePage = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../../private/profile.html"));
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

module.exports = {
  getProductosPage,
  getProfilePage,
  getCartPage,
};
