import { productRepository } from "../repositories/index.js";
import {
  HTTP_STATUS_ERROR_NOT_FOUND,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
} from "../const.js";
import logger from "../lib/logger.js";

const getProductos = async (ctx) => {
  try {
    const id = ctx.params.id;
    const productos = await productRepository.getById(id);
    ctx.response.status = HTTP_STATUS_OK;
    ctx.body = productos;
  } catch (error) {
    logger.error(error.message);
    ctx.response.status = HTTP_STATUS_ERROR_BAD_REQUEST;
    ctx.body = error;
  }
};

const removeProducto = async (ctx) => {
  try {
    const id = ctx.params.id;
    ctx.response.status = HTTP_STATUS_OK;
    ctx.body = await productRepository.delete(id);
  } catch (error) {
    logger.error(error.message);
    ctx.response.status = HTTP_STATUS_ERROR_BAD_REQUEST;
    ctx.body = error;
  }
};

const addProducto = async (ctx) => {
  try {
    const id = await productRepository.create(ctx.request.body);
    ctx.response.status = HTTP_STATUS_CREATED;
    ctx.body = await productRepository.getById(id);
  } catch (error) {
    if (error.message) {
      error = error.message;
    }
    logger.error(error);
    ctx.response.status = HTTP_STATUS_ERROR_BAD_REQUEST;
    ctx.body = error;
  }
};

const updateProducto = async (ctx) => {
  try {
    const id = ctx.params.id;
    const producto = await productRepository.getById(id);
    if (producto) {
      ctx.response.status = HTTP_STATUS_OK;
      ctx.body = await productRepository.update(id, ctx.request.body);
    } else {
      ctx.response.status = HTTP_STATUS_ERROR_NOT_FOUND;
      ctx.body = { message: `Producto ${id} no encontrado` };
    }
  } catch (error) {
    logger.error(error.message);
    ctx.response.status = HTTP_STATUS_ERROR_BAD_REQUEST;
    ctx.body = error;
  }
};

export default { updateProducto, removeProducto, getProductos, addProducto };
