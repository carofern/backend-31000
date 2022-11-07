const { Router } = require("express");
const rutasProductos = require("./productosRoutes");
const rutasProductosTest = require("./productosTestRoutes");
const sessionRoutes = require("./sessionRoutes");
const infoRoutes = require("./infoRoutes");
const webRoutes = require("./webRoutes");
const rutasRandoms = require("./randomsRoutes");
let { apiAuth, webAuth } = require("../middleware/session");

const rutas = Router();

rutas.use("/api/productos", apiAuth, rutasProductos);
rutas.use("/api/productos-test", rutasProductosTest);
rutas.use("/api/randoms", rutasRandoms);
rutas.use("/info", infoRoutes);
rutas.use("/", sessionRoutes);
rutas.use(webAuth);
rutas.use("/", webRoutes);

module.exports = rutas;
