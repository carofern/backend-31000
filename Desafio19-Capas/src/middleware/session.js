const session = require("express-session");
const config = require("../config/config");
const { HTTP_STATUS_ERROR_UNAUTHORIZED } = require("../../public/assets/scripts/const");
const { mongoUrl } = require("../config/config");
const { app } = require("../global");

function webAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

function apiAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(HTTP_STATUS_ERROR_UNAUTHORIZED)
      .send({ error: "No tiene autorizacion para acceder este recurso" });
  }
}

function sessionConfig() {
  // configuracion de la sesion en mongo atlas
  const MongoStore = require("connect-mongo");
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      }),
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      rolling: true, // para hacer que la sesion se refresque con cada petición
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: config.sessionMaxAge,
      },
    })
  );
}

module.exports = { webAuth, apiAuth, sessionConfig };
