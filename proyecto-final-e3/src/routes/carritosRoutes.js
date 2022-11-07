const { apiAuth } = require("../middleware/session");
const { Router } = require("express");
const rutasCarritos = Router();
const {
  addCarrito,
  deleteCarrito,
  getProductosCarrito,
  getProductosCountCarrito,
  addProductoCarrito,
  deleteProductoCarrito,
  deleteProductosCarrito,
  makePurchase,
} = require("../controllers/carritosController");

rutasCarritos.post("/", addCarrito);
rutasCarritos.delete("/:id", deleteCarrito);
rutasCarritos.get("/:id/productos/count", getProductosCountCarrito);
rutasCarritos.get("/:id/productos", getProductosCarrito);
rutasCarritos.post("/:id/productos", addProductoCarrito);
rutasCarritos.post("/:id/purchase", makePurchase);
rutasCarritos.delete("/:id/productos/", deleteProductosCarrito);
rutasCarritos.delete("/:id/productos/:id_prod", deleteProductoCarrito);

module.exports = rutasCarritos;
