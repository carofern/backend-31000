const mongoose = require("mongoose");
const carritosCollection = "carritos";

const CarritosSchema = new mongoose.Schema({
  timestamp: { type: String, required: true, max: 20 },
  usuario: { type: String, required: true },
  productos: { type: Array, required: true },
});

module.exports = mongoose.model(carritosCollection, CarritosSchema);
