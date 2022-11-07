const express = require("express");
const session = require("express-session");
const path = require("path");
const { productos } = require("./daos/ProductosDAO");
const { chat } = require("./daos/ChatDAO");
const { normalizar } = require("./util");
let { app, io } = require("./global");
let { webAuth } = require("./middleware/session");
const rutas = require("./routes/routes");
let { MONGO_URL } = require("../config/contenedoresConfig");

// configuracion del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// configuracion de la sesion en mongo atlas
const MongoStore = require("connect-mongo");

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "fd78642hgf9872gh3",
    resave: false,
    saveUninitialized: false,
    rolling: true, // para hacer que la sesion se refresque con cada petición
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in miliseconds
    },
  })
);

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", rutas);
app.use(webAuth);
app.use(express.static(path.join(__dirname, "../private")));

// configuracion del socket ------------------------------------------
io.on("connection", async (socket) => {
  console.log("Nuevo cliente: ", socket.id, socket.handshake.address);

  // devolver la lista actual de productos
  socket.emit("productos", await productos.getAll());

  // carga inicial de mensajes
  socket.emit("mensajes", normalizar(await chat.getAll()));

  // actualizacion de mensajes
  socket.on("mensaje", async (mensaje) => {
    try {
      mensaje.fechahora = new Date().toLocaleString();
      await chat.save(mensaje);
    } catch (error) {
      console.log("Error guardando mensaje de chat=", error);
    }
    io.sockets.emit("mensajes", await normalizar(chat.getAll()));
  });
});
