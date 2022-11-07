const logger = require("../logger");

function routeLog(req, res, next) {
  logger.info(req.method + " " + req.url);
  next();
}

function errorRouteLog(req, res, next) {
  logger.warn("Ruta no valida: " + req.method + " " + req.originalUrl);
  next();
}

module.exports = { routeLog, errorRouteLog };
