const path = require("path");
const logger = require("../logger");
const {
  HTTP_STATUS_ERROR_NOT_FOUND,
  HTTP_STATUS_ERROR_INTERNAL_SERVER_ERROR,
} = require("../../public/assets/scripts/const");
const { buildErrorMessage } = require("../util");

function errorHandler(err, req, res, next) {
  logger.error("Error interno del servidor: " + err.message);
  res
    .status(HTTP_STATUS_ERROR_INTERNAL_SERVER_ERROR)
    .send("Ha ocurrido un error interno del servidor");
}

function pageNotFound(req, res) {
  res.status(HTTP_STATUS_ERROR_NOT_FOUND).sendFile(path.join(__dirname, "../../private/404.html"));
}

module.exports = { errorHandler, pageNotFound };
