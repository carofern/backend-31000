const logger = require("./logger");
const sizeOf = require("image-size");
const util = require("util");
const fs = require("fs");

function cloneObj(objeto) {
  return JSON.parse(JSON.stringify(objeto));
}

function printObj(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

// Crea un objeto con el error y la descripcion del error
function buildErrorMessage(error, descripcion) {
  return {
    error,
    descripcion,
  };
}

// Verifica si una imagen es valida
function validImageFile(img) {
  result = false;
  try {
    //console.log(img, dimensions.width, dimensions.height);
    const dimensions = sizeOf(img);
    result = true;
  } catch (error) {}
  return result;
}

function deleteFile(filename) {
  try {
    fs.unlink(filename, (err) => {
      if (err) {
        logger.error(`deleteFile ${err}`);
      }
    });
  } catch (error) {
    logger.error(`deleteFile exception: ${error.message}`);
  }
}

module.exports = { cloneObj, printObj, buildErrorMessage, sizeOf, validImageFile, deleteFile };
