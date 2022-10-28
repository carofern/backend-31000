const { productos } = require("../data/productosData");
const { io } = require("../src/global");
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
} = require("../public/assets/scripts/const");

// Devuelve la lista de productos
const getProductos = (req, res) => {
  try {
    res.status(HTTP_STATUS_OK).send(productos.getAll());
  } catch (error) {
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

// Agrega un nuevo producto
const addProducto = (req, res) => {
  try {
    //console.log(req.body);
    productos.save(req.body);
    res.status(HTTP_STATUS_CREATED).end();
    io.sockets.emit("productos", productos.getAll());
    //res.status(HTTP_STATUS_CREATED).send({result: "OK"});
    // res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({error: "error inventado"});
  } catch (error) {
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error: error.message });
  }
};

module.exports = { getProductos, addProducto };