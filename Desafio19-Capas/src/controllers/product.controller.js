const { productService } = require("../services/index");
const { io } = require("../global");
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
} = require("../../public/assets/scripts/const");
const logger = require("../lib/logger");

// Devuelve la lista de productos
const getProductos = async (req, res) => {
  try {
    res.status(HTTP_STATUS_OK).send(await productService.getAllProducts());
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

// Agrega un nuevo producto
const addProducto = async (req, res) => {
  try {
    await productService.addNewProduct(req.body);
    res.status(HTTP_STATUS_CREATED).end();
    io.sockets.emit("productos", await productService.getAllProducts());
  } catch (error) {
    if (error.message) {
      error = error.message;
    }
    logger.error(error);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

module.exports = { getProductos, addProducto };
