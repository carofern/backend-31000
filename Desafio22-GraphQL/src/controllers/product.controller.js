import { productRepository } from "../repositories/index.js";
import { io } from "../global.js";

const getProductos = async (args) => {
  let id;
  if (args) id = args.id;
  const productos = await productRepository.getById(id);
  return productos;
};

const removeProducto = async (args) => {
  const id = args.id;
  const deletedProd = await productRepository.delete(id);
  io.sockets.emit("productos", await productRepository.getById());
  return deletedProd;
};

const updateProducto = async (args) => {
  const updatedProd = await productRepository.update(args.id, args.datos);
  io.sockets.emit("productos", await productRepository.getById());
  return updatedProd;
};

const addProducto = async (args) => {
  const id = await productRepository.create(args.datos);
  io.sockets.emit("productos", await productRepository.getById());
  return await productRepository.getById(id);
};

export default { removeProducto, getProductos, addProducto, updateProducto };
