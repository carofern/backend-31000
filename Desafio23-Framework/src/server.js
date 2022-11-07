import Koa from "koa";
import koaBody from "koa-body";
import yargs from "yargs";
import * as config from "./config/config.js";
import router from "./routes/index.js";
import logger from "./lib/logger.js";

const app = new Koa();

app.use(koaBody());

app.use(router.routes());

app.use((ctx) => {
  ctx.response.status = 404;
  ctx.body = {
    message: "Route not found",
  };
});

const args = yargs(process.argv.slice(2))
  .default({
    puerto: config.port, // puerto por defecto
    modo: "FORK",
  })
  .alias({
    p: "puerto",
    m: "modo",
  }).argv;

app.listen(args.puerto);
logger.info(`Servidor escuchando en el puerto ${args.puerto}`);
