const { Router } = require("express");
const router = Router();
const {
  login, getUser,
} = require("../controllers/loginController");

router.post("/", login);
router.get("/", getUser);

module.exports = router;
