const { productos } = require("../daos/ProductosDAO");
const { io } = require("../global");
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
} = require("../../public/assets/scripts/const");

// Devuelve la lista de productos
const getProductos = async (req, res) => {
  try {
    res.status(HTTP_STATUS_OK).send(await productos.getAll());
  } catch (error) {
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

// Agrega un nuevo producto
const addProducto = async (req, res) => {
  try {
    await productos.save(req.body);
    res.status(HTTP_STATUS_CREATED).end();
    io.sockets.emit("productos", await productos.getAll());
  } catch (error) {
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error: error.message });
  }
};

module.exports = { getProductos, addProducto };
