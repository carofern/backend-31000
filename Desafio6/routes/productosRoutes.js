const { Router } = require("express");
const router = Router();
const {
  addProducto,
  getProductos,
} = require("../controllers/productosController");

router.get("/productos", getProductos);
router.post("/productos", addProducto);

module.exports = router;
