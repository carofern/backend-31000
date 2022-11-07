require("dotenv").config();
const session = require("express-session");
const { HTTP_STATUS_ERROR_UNAUTHORIZED } = require("../../public/assets/scripts/const");
const { mongoDBURL } = require("../config");
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
        mongoUrl: mongoDBURL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      }),
      secret: process.env.SESSION_SECRET || "secret1234",
      resave: false,
      saveUninitialized: false,
      rolling: true, // para hacer que la sesion se refresque con cada petición
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: +process.env.SESSION_MAXAGE || 1000 * 60 * 10, // session max age in miliseconds
      },
    })
  );
}

function unauthorized(res) {
  res
    .status(HTTP_STATUS_ERROR_BAD_UNAUTHORIZED)
    .send(
      buildErrorMessage(
        HTTP_STATUS_ERROR_BAD_UNAUTHORIZED,
        `No tiene permiso para realizar esa operacion (${req.method}:${req.originalUrl})`
      )
    );
}

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      next();
    } else {
      unauthorized(res);
    }
  } else {
    unauthorized(res);
  }
};

module.exports = { webAuth, apiAuth, sessionConfig, isAdmin };
