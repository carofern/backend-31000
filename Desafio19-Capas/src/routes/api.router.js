const { Router } = require("express");
const productRouter = require("./product.router");
const testProductRouter = require("./testproduct.router");
const randomsRouter = require("./randoms.router");
const { apiAuth } = require("../middleware/session");

const router = Router();
router.use("/productos", apiAuth, productRouter);
router.use("/productos-test", testProductRouter);
router.use("/randoms", randomsRouter);

module.exports = router;
