const { Router } = require("express");
const router = Router();
const { getIndexPage } = require("../controllers/webController");

router.get("/", getIndexPage);

module.exports = router;
