const { fork } = require("child_process");
const { HTTP_STATUS_ERROR_BAD_REQUEST } = require("../../public/assets/scripts/const");
const path = require("path");

const getRandoms = async (req, res) => {
  try {
    let cantidad = 100000000;
    if (req.query.cant) {
      cantidad = req.query.cant;
    }
    const randoms = fork(path.join(__dirname, "../randoms.js"), [cantidad]);
    randoms.send("start");
    randoms.on("message", (result) => {
      res.end(result);
    });
  } catch (error) {
    console.log(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

module.exports = { getRandoms };
