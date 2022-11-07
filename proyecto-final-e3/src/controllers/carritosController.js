require("dotenv").config();
const { sendMail } = require("../mailer");
const { sendWhatsAppMessage, sendSMS } = require("../messenger");
const logger = require("../logger");
const { carritosDAO } = require("../daos/carritosDAO");
const { productosDAO } = require("../daos/productosDAO");
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
  HTTP_STATUS_ERROR_NOT_FOUND,
  PRODUCTO_INEXISTENTE,
  CARRITO_INEXISTENTE,
} = require("../../public/assets/scripts/const");
const { buildErrorMessage } = require("../util.js");

function indexOfProduct(idBuscado, products) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == idBuscado) return i;
  }
  return -1;
}

function getItemCount(cartItems) {
  return cartItems.reduce((pv, cv) => {
    return pv + cv.stock;
  }, 0);
}

// Crea un nuevo carrito y devuelve su id
const addCarrito = async (req, res) => {
  try {
    idCarrito = await carritosDAO.save({ productos: [] });
    res.status(HTTP_STATUS_CREATED).send({ idCarrito });
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

// borro un carrito
const deleteCarrito = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await carritosDAO.deleteById(id);
    if (result) {
      res.status(HTTP_STATUS_OK).end();
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE));
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

// Devuelve la lista de carritos
const getCarritos = async (req, res) => {
  try {
    const carritosDAO = await getCarritosDAO();
    res.status(HTTP_STATUS_OK).send(await carritosDAO.getAll());
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

const getProductosCarrito = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await carritosDAO.getById(id);
    if (result) {
      res.send(result.productos);
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE));
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

const getProductosCountCarrito = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await carritosDAO.getById(id);
    if (result) {
      const itemsCount = getItemCount(result.productos);
      res.send({ itemsCount });
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE));
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

const addProductoCarrito = async (req, res) => {
  try {
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
        const itemsCount = getItemCount(carrito.productos);
        res.status(HTTP_STATUS_CREATED).send({ itemsCount });
        return;
      }
      const producto = await productosDAO.getById(idProducto);
      if (producto) {
        const nuevoProducto = { ...producto };
        nuevoProducto.stock = 1;
        carrito.productos.push(nuevoProducto);
        await carritosDAO.updateById(id, carrito);
        const itemsCount = getItemCount(carrito.productos);
        res.status(HTTP_STATUS_CREATED).send({ itemsCount });
      } else {
        res
          .status(HTTP_STATUS_ERROR_NOT_FOUND)
          .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, PRODUCTO_INEXISTENTE));
      }
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE));
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

const deleteProductoCarrito = async (req, res) => {
  try {
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
          .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, PRODUCTO_INEXISTENTE));
      }
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE));
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

const deleteProductosCarrito = async (req, res) => {
  try {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const carrito = await carritosDAO.getById(id);
    if (carrito) {
      carrito.productos = [];
      await carritosDAO.updateById(id, carrito);
      res.status(HTTP_STATUS_OK).end();
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE));
    }
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

const makePurchase = async (req, res) => {
  try {
    const id = req.params.id;
    const carrito = await carritosDAO.getById(id);
    if (carrito) {
      // html con el contenido del pedido
      const subject = "Nuevo pedido de " + req.user.nombreApellido + " / " + req.user.email;
      let html =
        "<table><tr><th>Cantidad</th><th>Producto</th><th>Unitario</th><th>Total</th></tr>";
      let text = subject + "\r\n";
      let importeTotal = 0;
      for (producto of carrito.productos) {
        const precioTotalProducto = producto.precio * producto.stock;
        importeTotal += precioTotalProducto;
        html += `<tr><td>${producto.stock}</td><td>${producto.nombre}</td><td>${producto.precio}</td><td>${precioTotalProducto}</td></tr>`;
        text += `${producto.stock} x ${producto.nombre} $${precioTotalProducto}`;
      }
      html += `<tr><td></td><td></td><td>Total:</td><td>${importeTotal}</td></tr>`;
      html += `</table>`;
      text += `Total: ${importeTotal}`;
      // Enviar mail con el pedido al administrador
      await sendMail("WineHouse Tienda de vinos", process.env.ADMIN_MAIL, subject, html);
      // Enviar mensaje de whatsapp al administrador
      await sendWhatsAppMessage(text, null, process.env.ADMIN_PHONE);
      // Enviar SMS al cliente
      await sendSMS(
        "WineHouse - Recibimos tu pedido, lo estaremos procesando a la brevedad",
        req.user.telefono
      );
      // Vaciar el carrito
      carrito.productos = [];
      await carritosDAO.updateById(id, carrito);
      res.status(HTTP_STATUS_OK).end();
    } else {
      res
        .status(HTTP_STATUS_ERROR_NOT_FOUND)
        .send(buildErrorMessage(HTTP_STATUS_ERROR_NOT_FOUND, CARRITO_INEXISTENTE));
    }
  } catch (error) {
    logger.error(error.message);
    res
      .status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .send(buildErrorMessage(HTTP_STATUS_ERROR_BAD_REQUEST, error.message));
  }
};

module.exports = {
  addCarrito,
  deleteCarrito,
  getProductosCarrito,
  getProductosCountCarrito,
  addProductoCarrito,
  deleteProductoCarrito,
  deleteProductosCarrito,
  makePurchase,
};
