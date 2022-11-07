const mongoose = require("mongoose");
const productosCollection = "productos";

const ProductosSchema = new mongoose.Schema({
  timestamp: { type: String, required: true},
  nombre: { type: String, required: true, max: 100 },
  descripcion: { type: String, required: true, max: 100 },
  codigo: { type: String, required: true, max: 100 },
  foto: { type: String, required: true, max: 1000 },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model(productosCollection, ProductosSchema);
