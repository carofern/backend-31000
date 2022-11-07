const express = require("express");
const path = require("path");
const rutas = require("./routes/routes");
const yargs = require("yargs/yargs");
const cluster = require("cluster");
const { passportConfig } = require("./middleware/passport");
const { sessionConfig } = require("./middleware/session");
const { app, httpServer, numCPUs } = require("./global");
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

const args = yargs(process.argv.slice(2))
  .default({
    puerto: 8080,
    modo: "FORK",
  })
  .alias({
    p: "puerto",
    m: "modo",
  }).argv;

// creo el servidor de Express en el puerto indicado
if (args.modo.toUpperCase() === "FORK") {
  const server = httpServer.listen(args.puerto, () => {
    console.log(`Servidor fork escuchando en el puerto ${server.address().port}`);
  });
  // loguear cualquier error a consola
  server.on("error", (error) => console.log(`Error en servidor ${error}`));
} else {
  // mode cluster
  if (cluster.isPrimary) {
    // master
    console.log(`Worker primario PID ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
      console.log(`Lanzando worker ${i + 1}`);
      cluster.fork();
    }
    cluster.on("exit", (worker, Code, signal) => {
      console.log(`Worker ${worker.process.pid} finalizado`);
      // lanzo de nuevo el worker caido
      cluster.fork();
    });
  } else {
    // fork
    const server = httpServer.listen(args.puerto, () => {
      console.log(`Worker escuchando en el puerto ${server.address().port} PID ${process.pid}`);
    });
    server.on("error", (error) => console.log(`Error en servidor ${error}`));
    process.on("exit", (code) => {
      console.log(`Exit code ${code} PID ${process.pid}`);
    });
  }
}
