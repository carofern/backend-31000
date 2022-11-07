const { Router } = require("express");
const router = Router();
const {
  logout,
} = require("../controllers/logoutController");

router.get("/", logout);

module.exports = router;
