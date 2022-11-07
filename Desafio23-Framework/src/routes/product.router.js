import Router from "koa-router";
import { productController } from "../controllers/index.js";

const router = new Router({
  prefix: "/productos",
});

router.get("/", productController.getProductos);

router.get("/:id", productController.getProductos);

router.post("/", productController.addProducto);

router.put("/:id", productController.updateProducto);

router.delete("/:id", productController.removeProducto);

export default router;
