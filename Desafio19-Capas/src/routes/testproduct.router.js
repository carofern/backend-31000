const { Router } = require("express");
const { testProductController } = require("../controllers/index");

const router = Router();
router.route("/").get(testProductController.getProductosTest);

module.exports = router;
