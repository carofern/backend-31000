const { Router } = require("express");
const rutasProductos = require("./productosRoutes");
const rutasProductosTest = require("./productosTestRoutes");
const rutasLogin = require("./loginRoutes");
const rutasLogout = require("./logoutRoutes");
const rutas = Router();
let { apiAuth } = require("../middleware/session");

rutas.use("/productos", apiAuth, rutasProductos);
rutas.use("/productos-test", rutasProductosTest);
rutas.use("/login", rutasLogin);
rutas.use("/logout", rutasLogout);

module.exports = rutas;
