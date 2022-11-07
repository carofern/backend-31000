import { Router } from "express";
import { productController } from "../controllers/index.js";
const router = Router();

router.route("/").get(productController.getProductos).post(productController.addProducto);
router.route("/:id").get(productController.getProductos).delete(productController.removeProducto);

export default router;
