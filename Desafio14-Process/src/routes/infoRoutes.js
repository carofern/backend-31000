const { Router } = require("express");
const router = Router();
const { getInfoPage } = require("../controllers/infoPageController");

router.get("/", getInfoPage);

module.exports = router;
