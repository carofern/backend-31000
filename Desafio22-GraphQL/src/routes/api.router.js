import { Router } from "express";
import testProductRouter from "./testproduct.router.js";
import randomsRouter from "./randoms.router.js";
import { graphQLController } from "../controllers/index.js";
import { apiAuth } from "../middleware/session.js";

const router = Router();

router.use("/productos-test", testProductRouter);
router.use("/randoms", randomsRouter);
router.use("/graphql", apiAuth, graphQLController);

export default router;
