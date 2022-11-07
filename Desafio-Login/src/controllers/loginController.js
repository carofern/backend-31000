const {
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
} = require("../../public/assets/scripts/const");

const login = async (req, res) => {
  try {
    if (req.body.usuario) {
      req.session.nombre = req.body.usuario;
      res.status(HTTP_STATUS_OK).end();
    }
  } catch (error) {
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

const getUser = async (req, res) => {
  try {
    res.status(HTTP_STATUS_OK).send({ usuario: req.session.nombre });
  } catch (error) {
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

module.exports = { login, getUser };
