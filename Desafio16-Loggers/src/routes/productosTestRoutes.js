const { Router } = require("express");
const router = Router();
const { getProductosTest } = require("../controllers/productosTestController");

router.get("/", getProductosTest);

module.exports = router;
