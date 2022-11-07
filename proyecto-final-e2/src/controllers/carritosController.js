const { getCarritosDAO } = require("../daos/carritos/carritosDAO");
const { getProductosDAO } = require("../daos/productos/productosDAO");
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
  HTTP_STATUS_ERROR_NOT_FOUND,
  PRODUCTO_INEXISTENTE,
  CARRITO_INEXISTENTE,
} = require("../../public/assets/scripts/const");
const { buildErrorMessage } = require("../util.js");

async function nada(){

}

// Crea un nuevo carrito y devuelve su id
const addCarrito = async (req, res) => {
  const carritosDAO = await getCarritosDAO();
  try {
    idCarrito = await carritosDAO.save({ productos: [] });
    res.status(HTTP_STATUS_CREATED).send({ idCarrito });
  } catch (error) {
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

// borro un carrito
const deleteCarrito = async (req, res) => {
  const carritosDAO = await getCarritosDAO();
  const id = req.params.id;
  const result = await carritosDAO.deleteById(id);
  if (result) {
    res.status(HTTP_STATUS_OK).end();
  } else {
    res
      .status(HTTP_STATUS_ERROR_NOT_FOUND)
      .send(
        buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE)
      );
  }
};

// Devuelve la lista de carritos
const getCarritos = async (req, res) => {
  const carritosDAO = await getCarritosDAO();
  res.status(HTTP_STATUS_OK).send(await carritosDAO.getAll());
};

const getProductosCarrito = async (req, res) => {
  const carritosDAO = await getCarritosDAO();
  const id = req.params.id;
  const result = await carritosDAO.getById(id);
  if (result) {
    res.send(result.productos);
  } else {
    res
      .status(HTTP_STATUS_ERROR_NOT_FOUND)
      .send(
        buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE)
      );
  }
};

function indexOfProduct(idBuscado, products) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == idBuscado) return i;
  }
  return -1;
}

const addProductoCarrito = async (req, res) => {
  const carritosDAO = await getCarritosDAO();
  const productosDAO = await getProductosDAO();
  const id = req.params.id;
  const carrito = await carritosDAO.getById(id);
  if (carrito) {
    const idProducto = req.body.idProducto;
    const index = indexOfProduct(idProducto, carrito.productos);
    if (index !== -1) {
      // se trata de un producto que ya esta en el carrito
      // incremento en uno la cantidad
      carrito.productos[index].stock++;
      await carritosDAO.updateById(id, carrito);
      res.status(HTTP_STATUS_CREATED).end();
      return;
    }
    const producto = await productosDAO.getById(idProducto);
    if (producto) { 
      const nuevoProducto = { ...producto };
      nuevoProducto.stock = 1;
      carrito.productos.push(nuevoProducto);
      await carritosDAO.updateById(id, carrito);
      res.status(HTTP_STATUS_CREATED).end();
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(
          buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, PRODUCTO_INEXISTENTE)
        );
    }
  } else {
    res
      .status(HTTP_STATUS_ERROR_NOT_FOUND)
      .send(
        buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE)
      );
  }
};

const deleteProductoCarrito = async (req, res) => {
  const carritosDAO = await getCarritosDAO();
  const id = req.params.id;
  const id_prod = req.params.id_prod;
  const carrito = await carritosDAO.getById(id);
  if (carrito) {
    const index = indexOfProduct(id_prod, carrito.productos);
    if (index > -1) {
      carrito.productos.splice(index, 1);
      await carritosDAO.updateById(id, carrito);
      res.status(HTTP_STATUS_OK).send(carrito.productos);
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(
          buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, PRODUCTO_INEXISTENTE)
        );
    }
  } else {
    res
      .status(HTTP_STATUS_ERROR_NOT_FOUND)
      .send(
        buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE)
      );
  }
};

module.exports = {
  addCarrito,
  deleteCarrito,
  getProductosCarrito,
  addProductoCarrito,
  deleteProductoCarrito,
};