const { Router } = require("express");
const rutasUsuario = Router();
const { getInfoUsuario, getProfileUsuario } = require("../controllers/usuarioController");
const { apiAuth } = require("../middleware/session");

rutasUsuario.get("/info", getInfoUsuario);
rutasUsuario.get("/profile", apiAuth, getProfileUsuario);

module.exports = rutasUsuario;
