import logger from "../lib/logger.js";

function routeLog(req, res, next) {
  // console.log(
  //   req.method + " " + req.url + " headers:" + JSON.stringify(req.headers) + " body:",
  //   req.rawBody
  // );
  logger.info(req.method + " " + req.url);
  next();
}

function errorRouteLog(req, res, next) {
  logger.warn("Ruta no valida: " + req.method + " " + req.baseUrl);
  next();
}

export { routeLog, errorRouteLog };
