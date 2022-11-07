const fs = require("fs");
const path = require("path");
const { HTTP_STATUS_OK } = require("../../public/assets/scripts/const");
const logger = require("../logger");

const logoutPage =
  fs.readFileSync(path.join(__dirname, "../../public/assets/views/logout.hbs")) + "";

const getLogoutPage = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user = await req.user;
      const usuario = user.nombreApellido;
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

module.exports = { getLogoutPage };
