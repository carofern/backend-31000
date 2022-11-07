const { Router } = require("express");
const { passport } = require("../middleware/passport");
const { postLogin, postLoginFailed, getLoginPage } = require("../controllers/loginController");
const { getLogoutPage } = require("../controllers/logoutController");
const { postSignup, postSignupFailed, getSignupPage } = require("../controllers/signupController");
const { getUser } = require("../controllers/userController");

const router = Router();

function errorHandler(err, req, res, next) {
  return res.status(401).send({ success: false, message: err });
}

router
  .route("/login")
  .get(getLoginPage)
  .post(
    passport.authenticate("login", { failureRedirect: "/loginFailed", failureMessage: true }),
    postLogin,
    errorHandler
  );

router.route("/loginFailed").get(postLoginFailed).post(postLoginFailed);

router.route("/logout").get(getLogoutPage);

router
  .route("/signup")
  .get(getSignupPage)
  .post(
    passport.authenticate("signup", { failureRedirect: "/signupFailed", failureMessage: true }),
    postSignup,
    errorHandler
  );

router.route("/signupFailed").get(postSignupFailed).post(postSignupFailed);

router.route("/user").get(getUser);

module.exports = router;
