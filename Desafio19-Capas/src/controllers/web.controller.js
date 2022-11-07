const path = require("path");
const { HTTP_STATUS_ERROR_BAD_REQUEST } = require("../../public/assets/scripts/const");
const logger = require("../lib/logger");

const getIndexPage = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../../private/index.html"));
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

module.exports = { getIndexPage };
