const fs = require("fs");
const path = require("path");
const { numCPUs } = require("../global");
const { HTTP_STATUS_ERROR_BAD_REQUEST } = require("../../public/assets/scripts/const");
const logger = require("../lib/logger");

const indexHbs = fs.readFileSync(path.join(__dirname, "../../public/assets/views/index.hbs")) + "";

function buildInfoPage() {
  let parametros = "";
  for (let j = 2; j < process.argv.length; j++) {
    parametros += process.argv[j] + " ";
  }
  const lista = `
    <ul>
      <li>Argumentos de entrada: ${parametros}</li>
      <li>Path de ejecución: ${process.execPath}</li>
      <li>Nombre de la plataforma: ${process.platform}</li>
      <li>Process id: ${process.pid}</li>
      <li>Versión de node.js: ${process.version}</li>
      <li>Carpeta del proyecto: ${process.cwd()}</li>
      <li>Memoria total reservada: ${process.memoryUsage().rss / 1024} kb</li>
      <li>Numero de procesadores: ${numCPUs}</li>
    </ul>
    `;
  return indexHbs.replace("{{{body}}}", lista);
}

const getInfoPage = async (req, res) => {
  try {
    res.end(buildInfoPage());
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

const getInfoLogPage = async (req, res) => {
  try {
    const html = buildInfoPage();
    console.log(html);
    res.end(html);
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

module.exports = { getInfoPage, getInfoLogPage };
