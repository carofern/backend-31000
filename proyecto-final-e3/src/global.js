const express = require("express");
const compression = require("compression");
const { Server: HttpServer } = require("http");

const app = express();
const httpServer = new HttpServer(app);

// configuracion del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion de compresion
// threshold: indica tamaño minimo a comprimir
// level: nivel de compresion 0 mimimo 9 maximo
// filter: funcion que indica si la petición tiene que comprimirse o no
app.use(compression({ threshold: 0, level: 9, filter: () => true }));

const numCPUs = require("os").cpus().length;

module.exports = { app, httpServer, numCPUs };
