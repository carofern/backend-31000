const { Router } = require("express");
const apiRouter = require("./api.router");
const sessionRouter = require("./session.router");
const infoRouter = require("./info.router");
const webRouter = require("./web.router");
const { webAuth } = require("../middleware/session");
const path = require("path");
const { errorRouteLog } = require("../middleware/routeLogging.js");

const router = Router();
const page404 = path.join(__dirname, "../../private/404.html");

function routeNotFound(req, res) {
  res.status(404).sendFile(page404);
}

router.use("/api", apiRouter);
router.use("/info", infoRouter);
router.use("/", sessionRouter);
router.use("/", webAuth, webRouter);
// rutas inexistentes
router.use("*", errorRouteLog, routeNotFound);

module.exports = { router, routeNotFound };
