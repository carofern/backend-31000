const path = require("path");
const { HTTP_STATUS_ERROR_UNAUTHORIZED } = require("../../public/assets/scripts/const");

function webAuth(req, res, next) {
  if (req.session?.nombre) {
    next();
  } else {
    res.sendFile(path.join(__dirname, "../../private/login.html"));
  }
}

function apiAuth(req, res, next) {
  if (req.session?.nombre) {
    next();
  } else {
    res
      .status(HTTP_STATUS_ERROR_UNAUTHORIZED)
      .send({ error: "No tiene autorizacion para acceder este recurso" });
  }
}

module.exports = { webAuth, apiAuth };
