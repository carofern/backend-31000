const mongoose = require("mongoose");
const usuariosCollection = "usuarios";

const UsuariosSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model(usuariosCollection, UsuariosSchema);
