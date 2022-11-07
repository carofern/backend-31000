const { Router } = require("express");
const rutasProductos = require("./productosRoutes");
const rutasProductosTest = require("./productosTestRoutes");
const sessionRoutes = require("./sessionRoutes");
const webRoutes = require("./webRoutes");
let { apiAuth, webAuth } = require("../middleware/session");

const rutas = Router();

rutas.use("/api/productos", apiAuth, rutasProductos);
rutas.use("/api/productos-test", rutasProductosTest);
rutas.use("/", sessionRoutes);
rutas.use(webAuth);
rutas.use("/", webRoutes);

module.exports = rutas;
