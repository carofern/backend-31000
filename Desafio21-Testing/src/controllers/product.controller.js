import { productRepository } from "../repositories/index.js";
import { io } from "../global.js";
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK, HTTP_STATUS_ERROR_BAD_REQUEST } from "../const.js";
import logger from "../lib/logger.js";

const getProductos = async (req, res) => {
  try {
    const id = req.params.id;
    const productos = await productRepository.getById(id);
    res.status(HTTP_STATUS_OK).send(productos);
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

const removeProducto = async (req, res) => {
  try {
    const id = req.params.id;
    res.status(HTTP_STATUS_OK).send(await productRepository.delete(id));
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

const addProducto = async (req, res) => {
  try {
    const id = await productRepository.create(req.body);
    res.status(HTTP_STATUS_CREATED).send(await productRepository.getById(id));
    io.sockets.emit("productos", await productRepository.getById());
  } catch (error) {
    if (error.message) {
      error = error.message;
    }
    logger.error(error);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

export default { removeProducto, getProductos, addProducto };
