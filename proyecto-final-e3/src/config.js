const path = require("path");
require("dotenv").config();

// MongoDB
const mongoDBURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`;
const mongoDBProductosModel = path.join(__dirname, "../src/models/productosModel.js");
const mongoDBCarritosModel = path.join(__dirname, "../src/models/carritosModel.js");
const mongoDBUsuariosModel = path.join(__dirname, "../src/models/usuariosModel.js");

module.exports = {
  mongoDBURL,
  mongoDBProductosModel,
  mongoDBCarritosModel,
  mongoDBUsuariosModel,
};
