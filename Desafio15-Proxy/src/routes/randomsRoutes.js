const { Router } = require("express");
const router = Router();
const { getRandoms } = require("../controllers/randomsController");

router.get("/", getRandoms);

module.exports = router;
