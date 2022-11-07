const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { usuarios } = require("../daos/UsuariosDAO");
let { app } = require("../global");

const USUARIO_NO_VALIDO = "Usuario o contraseña no validos.";

function passportConfig() {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async function (req, username, password, done) {
        let usuario = await usuarios.find({ username });

        if (!usuario) {
          console.log("Usuario no encontrado: ", username);
          return done(null, false, { message: USUARIO_NO_VALIDO });
        } else {
          if (!isValidPassword(usuario, password)) {
            console.log(username, "contraseña invalida");
            return done(null, false, { message: USUARIO_NO_VALIDO });
          } else {
            return done(null, usuario);
          }
        }
      }
    )
  );

  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async function (req, username, password, done) {
        let usuario = await usuarios.find({ username });

        if (usuario) {
          console.log("Usuario existente: ", username);
          return done(null, false, { message: "El usuario ya existe." });
        } else {
          let newUser = { username: username, password: createHash(password) };
          const id = await usuarios.save(newUser);
          newUser = await usuarios.getById(id);

          return done(null, newUser);
        }
      }
    )
  );
}

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  let user = await usuarios.getById(id);
  return done(null, user);
});

module.exports = { passport, passportConfig };
