const { Router } = require("express");
const rutasWeb = Router();
const { getProductosPage, getProfilePage, getCartPage } = require("../controllers/webController");

rutasWeb.get("/productos", getProductosPage);
rutasWeb.get("/profile", getProfilePage);
rutasWeb.get("/cart", getCartPage);

module.exports = rutasWeb;
