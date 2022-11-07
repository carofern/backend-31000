const { Router } = require("express");
const { webController } = require("../controllers/index");

const router = Router();
router.route("/").get(webController.getIndexPage);

module.exports = router;
