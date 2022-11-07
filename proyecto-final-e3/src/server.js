require("dotenv").config();
const cluster = require("cluster");
const express = require("express");
const path = require("path");
const logger = require("./logger");
const { errorHandler, pageNotFound } = require("./middleware/errorHandler");
const { rutas } = require("./routes/routes");
const { routeLog, errorRouteLog } = require("./middleware/routeLogging.js");
const { sessionConfig } = require("./middleware/session");
const { app, httpServer, numCPUs } = require("./global");
const { passportConfig } = require("./middleware/passport");

const SERVER_PORT = process.env.SERVER_PORT || 8080;

// configuracion de la sesion usando mongo como persistencia
sessionConfig();

// configuracion passport
passportConfig();

// log de requerimientos
app.use(routeLog);

// contenido estatico
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../uploads")));

// rutas
app.use("/", rutas);

// ruta no encontrada
app.all("*", errorRouteLog, pageNotFound);

// manejador de errores de servidor
app.use(errorHandler);

// creo el servidor de Express en el puerto indicado
if (process.env.SERVER_MODE === "FORK") {
  const server = httpServer.listen(SERVER_PORT, () => {
    logger.info(`Servidor fork escuchando en el puerto ${server.address().port}`);
  });
  // loguear cualquier error a consola
  server.on("error", (error) => logger.error(`Error en servidor ${error}`));
} else {
  // mode cluster
  if (cluster.isPrimary) {
    // master
    logger.info(`Servidor primario PID ${process.pid}`);
    logger.info(`Lanzando ${numCPUs} workers `);
    for (let i = 0; i < numCPUs; i++) {
      logger.info(`Lanzando worker ${i + 1}`);
      cluster.fork();
    }
    cluster.on("exit", (worker, Code, signal) => {
      logger.info(`Worker ${worker.process.pid} finalizado`);
    });
  } else {
    // fork
    const server = httpServer.listen(SERVER_PORT, () => {
      logger.info(`Worker escuchando en el puerto ${server.address().port} PID ${process.pid}`);
    });
    server.on("error", (error) => logger.error(`Error en servidor ${error}`));
    process.on("exit", (code) => {
      logger.info(`Exit code ${code} PID ${process.pid}`);
    });
  }
}
