const productosDao = require("../daos/productosDao");

async function getAllProducts() {
  return await productosDao.getAll();
}

async function addNewProduct(newProduct) {
  if (typeof newProduct.title !== "string") throw "Title must be string";
  if (typeof newProduct.price !== "number") throw "Price must be number";
  if (typeof newProduct.thumbnail !== "string") throw "Thumbnail must be string";

  await productosDao.save(newProduct);
}

module.exports = { getAllProducts, addNewProduct };
