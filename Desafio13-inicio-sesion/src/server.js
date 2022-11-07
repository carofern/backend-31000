const express = require("express");
const path = require("path");
const rutas = require("./routes/routes");
const { passportConfig } = require("./middleware/passport");
const { sessionConfig } = require("./middleware/session");
const { app } = require("./global");
const { socketConfig } = require("./socket");

// configuracion de la sesion usando mongo como persistencia
sessionConfig();

// configuracion passport
passportConfig();

// static
app.use(express.static(path.join(__dirname, "../public")));

// ruta raiz
app.use("/", rutas);

// configuracion del socket
socketConfig();
