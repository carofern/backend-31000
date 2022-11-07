const mongoose = require("mongoose");
const productosCollection = "productos";

const ProductosSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

module.exports = mongoose.model(productosCollection, ProductosSchema);
