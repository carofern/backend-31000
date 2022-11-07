const { Router } = require("express");
const router = Router();
const { productController } = require("../controllers/index");

router.route("/").get(productController.getProductos).post(productController.addProducto);

module.exports = router;
