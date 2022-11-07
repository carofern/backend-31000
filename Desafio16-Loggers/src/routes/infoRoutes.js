const { Router } = require("express");
const router = Router();
const { getInfoPage, getInfoLogPage } = require("../controllers/infoPageController");

router.get("/", getInfoPage);
router.get("/log", getInfoLogPage);

module.exports = router;
