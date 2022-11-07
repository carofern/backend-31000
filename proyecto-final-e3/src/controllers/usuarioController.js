const path = require("path");
const logger = require("../logger");
const { HTTP_STATUS_ERROR_BAD_REQUEST } = require("../../public/assets/scripts/const");
const { buildErrorMessage } = require("../util.js");

const getInfoUsuario = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.send({
        usuario: req.user.nombreApellido,
        email: req.user.email,
        isAdmin: !!req.user.isAdmin,
        carrito: req.user.carrito,
      });
    } else {
      res.send({ usuario: null, email: null, isAdmin: false, carrito: null });
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

const getProfileUsuario = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.send({
        nombreApellido: req.user.nombreApellido,
        direccion: req.user.direccion,
        email: req.user.email,
        edad: req.user.edad,
        telefono: req.user.telefono,
        avatar: req.user.avatar,
      });
    } else {
      res.send({});
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

module.exports = {
  getInfoUsuario,
  getProfileUsuario,
};
