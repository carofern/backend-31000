const fs = require("fs");
const path = require("path");
const { HTTP_STATUS_OK } = require("../../public/assets/scripts/const");

const logout = async (req, res) => {
  const logoutPage =
    fs.readFileSync(path.join(__dirname, "../../public/assets/views/logout.hbs")) + "";
  try {
    if (req.session?.nombre) {
      const usuario = req.session?.nombre;
      const result = await req.session.destroy();
      //console.log(res);
      if (result.cookie) {
        res.baseUrl = "/";
        res.status(HTTP_STATUS_OK).send(logoutPage.replace("{{{body}}}", "Hasta luego " + usuario));
      } else {
        res.redirect("/");
      }
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
};

module.exports = { logout };
