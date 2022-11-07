const { Router } = require("express");
const router = Router();
const { infoPageController } = require("../controllers/index");

router.route("/").get(infoPageController.getInfoPage);
router.route("/log").get(infoPageController.getInfoLogPage);

module.exports = router;
