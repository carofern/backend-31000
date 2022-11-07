const { Router } = require("express");
const router = Router();
const {
  addProducto,
  getProductos,
} = require("../controllers/productosController");

router.get("/", getProductos);
router.post("/", addProducto);

module.exports = router;
