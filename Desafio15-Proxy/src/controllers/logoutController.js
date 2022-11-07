const fs = require("fs");
const path = require("path");
const { HTTP_STATUS_OK } = require("../../public/assets/scripts/const");

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
    res.redirect("/");
  }
};

module.exports = { getLogoutPage };
