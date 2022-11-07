import { Router } from "express";
import { testProductController } from "../controllers/index.js";

const router = Router();
router.route("/").get(testProductController.getProductosTest);

export default router;
