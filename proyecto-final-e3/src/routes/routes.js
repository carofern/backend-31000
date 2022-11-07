const { Router } = require("express");
const rutasProductos = require("./productosRoutes");
const rutasCarritos = require("./carritosRoutes");
const rutasWeb = require("./webRoutes");
const rutasUsuario = require("./usuarioRoutes");
const { apiAuth, webAuth } = require("../middleware/session");
const sessionRoutes = require("./sessionRoutes");

const rutas = Router();

rutas.use("/api/productos", apiAuth, rutasProductos);
rutas.use("/api/carrito", apiAuth, rutasCarritos);
rutas.use("/api/usuario", rutasUsuario);
rutas.use("/", sessionRoutes);
rutas.use(webAuth);
rutas.use("/", rutasWeb);

module.exports = { rutas };
