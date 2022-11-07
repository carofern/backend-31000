const logger = require("../lib/logger");

function routeLog(req, res, next) {
  logger.info(req.method + " " + req.url);
  next();
}

function errorRouteLog(req, res, next) {
  logger.warn("Ruta no valida: " + req.method + " " + req.baseUrl);
  next();
}

module.exports = { routeLog, errorRouteLog };
