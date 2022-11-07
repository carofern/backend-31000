const { Router } = require("express");
const rutasProductos = require("./productosRoutes");
const rutasProductosTest = require("./productosTestRoutes");

const rutas = Router();

rutas.use("/productos", rutasProductos);
rutas.use("/productos-test", rutasProductosTest);

module.exports = rutas;
