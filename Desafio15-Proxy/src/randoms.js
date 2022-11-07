const random = require("random");

let cantidad;
if (process.argv[2]) {
  const cant = +process.argv[2];
  if (Number.isInteger(cant)) {
    cantidad = cant;
  }
}

console.log("fork cantidad: " + cantidad);

process.on("message", (msg) => {
  if (msg === "start") {
    console.log("fork started: " + cantidad);
    const res = buildRandomNumberList(cantidad);
    console.log("fork completed: " + res.length);
    process.send(JSON.stringify(res));
    process.exit();
  }
});

function buildRandomNumberList(count) {
  const numeros = [];
  for (let i = 1; i <= 1000; i++) {
    numeros[i] = 0;
  }
  for (let i = 1; i <= count; i++) {
    const numeroAleatorio = random.int(1, 1000);
    numeros[numeroAleatorio]++;
  }
  numeros.splice(0, 1);
  return numeros.map((element, idx) => ({ [idx + 1]: element }));
}

//console.log(buildRandomNumberList(1000000));
