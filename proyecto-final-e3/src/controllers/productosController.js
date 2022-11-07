const logger = require("../logger");
const { productosDAO } = require("../daos/productosDAO");
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
  HTTP_STATUS_ERROR_NOT_FOUND,
  PRODUCTO_INEXISTENTE,
} = require("../../public/assets/scripts/const");
const { buildErrorMessage } = require("../util.js");

// Devuelve la lista de productos
const getProductos = async (req, res) => {
  try {
    res.status(HTTP_STATUS_OK).send(await productosDAO.getAll());
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, PRODUCTO_INEXISTENTE));
  }
};

// Devuelve el producto indicado por id
const getProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productosDAO.getById(id);
    if (result) {
      res.send(result);
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, PRODUCTO_INEXISTENTE));
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

// Agrega un nuevo producto
const addProducto = async (req, res) => {
  try {
    await productosDAO.save(req.body);
    res.status(HTTP_STATUS_CREATED).end();
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

// actualizar un producto
const updateProducto = async (req, res) => {
  try {
    const productoActualizado = req.body;
    const id = req.params.id;
    const result = await productosDAO.updateById(id, productoActualizado);
    if (result) {
      res.status(HTTP_STATUS_OK).send(result);
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, PRODUCTO_INEXISTENTE));
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

// borro un producto
const deleteProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productosDAO.deleteById(id);
    if (result) {
      res.send(result);
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, PRODUCTO_INEXISTENTE));
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

module.exports = {
  getProductos,
  getProducto,
  addProducto,
  updateProducto,
  deleteProducto,
};
