const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const indexHbs = fs.readFileSync(path.join(__dirname, "../../public/assets/views/index.hbs")) + "";
const tabla_productos =
  fs.readFileSync(path.join(__dirname, "../../public/assets/views/tabla_productos.hbs")) + "";

async function getProductosTest(req, res) {
  const cantidad = req.query.cant || 5;
  const testProducts = [];
  for (let i = 0; i < cantidad; i++) {
    testProducts.push({
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image(),
    });
  }

  const view = indexHbs.replace("{{{body}}}", tabla_productos);
  const template = Handlebars.compile(view);
  const html = template({ productos: testProducts });

  res.end(html);
}

module.exports = { getProductosTest };
