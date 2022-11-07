const path = require("path");
const { fork } = require("child_process");
const { HTTP_STATUS_ERROR_BAD_REQUEST } = require("../../public/assets/scripts/const");
const logger = require("../lib/logger");
const { buildRandomNumberList } = require("../lib/util");

const getRandomsFork = async (req, res) => {
  try {
    let cantidad = 100000000;
    if (req.query.cant) {
      cantidad = req.query.cant;
    }
    const randoms = fork(path.join(__dirname, "../randomsFork.js"), [cantidad]);
    randoms.send("start");
    randoms.on("message", (result) => {
      res.end(result);
    });
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

const getRandomsBlocking = async (req, res) => {
  try {
    let cantidad = 100000000;
    if (req.query.cant) {
      cantidad = req.query.cant;
    }
    res.end(JSON.stringify(buildRandomNumberList(cantidad)));
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

module.exports = { getRandoms: getRandomsBlocking };
