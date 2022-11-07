const usuariosDao = require("../daos/usuariosDao");

async function getUser(username) {
  return await usuariosDao.find({ username });
}

async function addNewUser(newUser) {
  if (typeof newUser.username !== "string") throw "Username must be string";
  if (typeof newUser.password !== "string") throw "Password must be string";
  return await usuariosDao.save(newUser);
}

async function getUserById(id) {
  return await usuariosDao.getById(id);
}

module.exports = { getUser, addNewUser, getUserById };
