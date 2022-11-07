const { Router } = require("express");
const router = Router();
const { randomsController } = require("../controllers/index");

router.route("/").get(randomsController.getRandoms);

module.exports = router;
