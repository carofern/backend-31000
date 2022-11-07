const productosDao = require("../daos/productosDao");

const productosMuestra = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
];

async function insertTestData() {
  await productosDao.deleteAll();
  for (let i = 0; i < productosMuestra.length; i++) {
    console.log(await productosDao.save(productosMuestra[i]));
  }
  console.log(await productosDao.getAll());
  await productosDao.disconnect();
}

insertTestData();
