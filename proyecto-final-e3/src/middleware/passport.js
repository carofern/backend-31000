require("dotenv").config();
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { usuariosDAO } = require("../daos/UsuariosDAO");
const { carritosDAO } = require("../daos/CarritosDAO");
let { app } = require("../global");
const logger = require("../logger");
const { sendMail } = require("../mailer");
const { validImageFile, deleteFile } = require("../util");

const USUARIO_NO_VALIDO = "Usuario o contraseña no validos.";

function passportConfig() {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        let usuario = await usuariosDAO.find({ email });

        if (!usuario) {
          logger.warn("Usuario no encontrado: ", email);
          return done(null, false, { message: USUARIO_NO_VALIDO });
        } else {
          if (!isValidPassword(usuario, password)) {
            logger.warn("Contraseña no valida para usuario: ", email);
            return done(null, false, { message: USUARIO_NO_VALIDO });
          } else {
            // Devolver el id de carrito como parte del usuario
            // si por alguna razon no existe, crearlo
            let carrito = await carritosDAO.find({ usuario: usuario.id });
            if (!carrito) {
              carrito = {};
              carrito.id = await carritosDAO.save({ usuario: usuario.id, productos: [] });
            }
            usuario.carrito = carrito.id;
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
        usernameField: "email",
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        try {
          let usuario = await usuariosDAO.find({ email });

          if (usuario) {
            logger.info("Usuario existente: " + email);
            deleteFile(req.file.path);
            return done(null, false, { message: "El email ya está registrado." });
          } else {
            if (!validImageFile(req.file.path)) {
              deleteFile(req.file.path);
              return done(null, false, { message: "La imagen de perfil no es valida." });
            }

            let newUser = {
              nombreApellido: req.body.name,
              direccion: req.body.address,
              email,
              edad: req.body.age,
              telefono: req.body.phoneNumber,
              password: createHash(password),
              avatar: req.file.filename,
              isAdmin: false,
            };

            const id = await usuariosDAO.save(newUser);
            newUser = await usuariosDAO.getById(id);
            let carritoId = await carritosDAO.save({ usuario: newUser.id, productos: [] });
            newUser.carrito = carritoId;

            // Mail con nuevo usuario
            const html = `Datos del nuevo usuario registrado:<br>
            Nombre y Apellido: ${newUser.nombreApellido}<br>
            Direccion: ${newUser.direccion}<br>
            Email: ${newUser.email}<br>
            Edad: ${newUser.edad}<br>
            Telefono: ${newUser.telefono}
            `;
            sendMail("WineHouse Tienda de vinos", process.env.ADMIN_MAIL, "Nuevo registro", html);
            return done(null, newUser);
          }
        } catch (error) {
          logger.error(`Error signup:  ${error.message}`);
          deleteFile(req.file.path);
          return done(null, false, { message: "Fallo en la registración." });
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
  let user = await usuariosDAO.getById(id);
  // Devolver el id de carrito como parte del usuario
  // si por alguna razon no existe, crearlo
  let carrito = await carritosDAO.find({ usuario: user.id });
  if (!carrito) {
    carrito = {};
    carrito.id = await carritosDAO.save({ usuario: user.id, productos: [] });
  }
  user.carrito = carrito.id;
  return done(null, user);
});

module.exports = { passport, passportConfig };
