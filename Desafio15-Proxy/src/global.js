const morgan = require("morgan");
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

// configuracion del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const numCPUs = require("os").cpus().length;

module.exports = { app, io, httpServer, numCPUs };
