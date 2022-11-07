const {
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
  HTTP_STATUS_ERROR_UNAUTHORIZED,
} = require("../../public/assets/scripts/const");
const logger = require("../logger");

const { usuarios } = require("../daos/UsuariosDAO");

const getUser = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userId = req.session.passport.user;
      const user = await usuarios.getById(userId);
      res.status(HTTP_STATUS_OK).send({ usuario: user.username });
    } else {
      res
        .status(HTTP_STATUS_ERROR_UNAUTHORIZED)
        .send({ error: "No tiene autorizacion para acceder este recurso" });
    }
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

module.exports = { getUser };
