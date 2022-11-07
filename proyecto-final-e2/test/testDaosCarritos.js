const { printObj } = require("../src/util");

const {
  CarritosDAOArchivo,
} = require("../src/daos/carritos/CarritosDAOArchivo.js");
const {
  CarritosDAOMemoria,
} = require("../src/daos/carritos/CarritosDAOMemoria.js");
const {
  CarritosDAOFirebase,
} = require("../src/daos/carritos/CarritosDAOFirebase.js");
const {
  CarritosDAOMongoDB,
} = require("../src/daos/carritos/CarritosDAOMongoDB.js");
const {
  CarritosDAOMySQL,
} = require("../src/daos/carritos/CarritosDAOMySQL.js");
const {
  CarritosDAOSQLite3,
} = require("../src/daos/carritos/CarritosDAOSQLite3.js");

const testProducts = [
  {
    nombre: "Vino Cafayate Cabernet Sauvignon",
    descripcion:
      "Vino Tinto Cabernet Sauvignon Cafayate Reserve Bodega Etchart 750ml",
    codigo: "VINO0001",
    foto: "https://http2.mlstatic.com/D_NQ_NP_984845-MLA43940662040_102020-W.webp",
    precio: 740,
    stock: 100,
  },
  {
    nombre: "Vino Cafayate Malbec",
    descripcion: "Vino Tinto Malbec Cafayate Bodega Etchart 750ml",
    codigo: "VINO0002",
    foto: "https://http2.mlstatic.com/D_NQ_NP_647407-MLA43940685144_102020-W.webp",
    precio: 490,
    stock: 200,
  },
  {
    nombre: "Vino Cafayate Torrontés ",
    descripcion: "Vino Blanco Torrontés Cafayate Bodega Etchart 750ml",
    codigo: "VINO0003",
    foto: "https://http2.mlstatic.com/D_NQ_NP_906258-MLA45296333960_032021-W.webp",
    precio: 550,
    stock: 300,
  },
];

const updatedProduct = {
  nombre: "Vino Luigi Bosca Malbec",
  descripcion: "Luigi Bosca Malbec Vino 750ml Pack X3 Botellas",
  codigo: "VINO0010",
  foto: "https://http2.mlstatic.com/D_NQ_NP_660229-MLA44091544800_112020-W.webp",
  precio: 5700,
  stock: 10,
};

async function testDAO(titulo, dao) {
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("---------------- " + titulo);
  console.log(
    "----------------------------------------------------------------"
  );

  console.log("--deleteAll--");
  await dao.deleteAll();

  console.log("--save--");
  for (let i = 0; i < testProducts.length; i++) {
    const carrito = { productos: [testProducts[i]] };
    console.log("Id producto " + i + " =", await dao.save(carrito));
  }
  console.log("--getAll--");
  const items = await dao.getAll();
  printObj(items);

  console.log("--getById--10");
  console.log(await dao.getById(10));

  console.log("--getById--" + items[1].id);
  printObj(await dao.getById(items[1].id));

  console.log("--deleteById--10");
  console.log(await dao.deleteById(10));

  console.log("--deleteById--" + items[1].id);
  console.log(await dao.deleteById(items[1].id));

  console.log("--getAll--");
  printObj(await dao.getAll());

  console.log("--updateById--10");
  console.log(await dao.updateById(10, {}));

  console.log("--updateById--" + items[0].id);
  const carrito = await dao.getById(items[0].id);
  carrito.productos = [updatedProduct];
  console.log(await dao.updateById(items[0].id, carrito));

  console.log("--getById--" + items[0].id);
  console.log(await dao.getById(items[0].id));

  console.log("--getAll--");
  printObj(await dao.getAll());

  dao.disconnect();
}

async function testDAOArchivos() {
  const daoArchivos = new CarritosDAOArchivo();
  await testDAO("DAO Archivo", daoArchivos);
}

async function testDAOMemoria() {
  const daoMemoria = new CarritosDAOMemoria();
  await testDAO("DAO Memoria", daoMemoria);
}

async function testDAOMongoDB() {
  const daoMongoDB = new CarritosDAOMongoDB();
  await testDAO("DAO MongoDB", daoMongoDB);
}

async function testDAOFirebase() {
  const daoFirebase = new CarritosDAOFirebase();
  await testDAO("DAO Firebase", daoFirebase);
}

async function testDAOSqlite3() {
  let daoSQLite3 = new CarritosDAOSQLite3();
  await testDAO("DAO SQLite3", daoSQLite3);
}

async function testDAOMySQL() {
  const daoMySQL = new CarritosDAOMySQL();
  await testDAO("DAO MySQL", daoMySQL);
}

async function test() {
  await testDAOArchivos();
  await testDAOMemoria();
  await testDAOMongoDB();
  await testDAOFirebase();
  await testDAOSqlite3();
  await testDAOMySQL();
}

test();
