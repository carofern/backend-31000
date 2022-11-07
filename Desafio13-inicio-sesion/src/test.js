findObj = {test:1}
value = {test:2}

console.log( value[Object.keys(findObj)] === findObj[Object.keys(findObj)]);

findObj = {test:1}
value = {test:1}

console.log( value[Object.keys(findObj)] === findObj[Object.keys(findObj)]);

listaItems = [
  {test:1, test2:"a"},
  {test:2, test2:"b"},
  {test:3, test2:"c"},
  {test:4, test2:"d"},
  {test:5, test2:"e"},
  {test:6, test2:"f"},
  {test:7, test2:"g"},

]

findObj = {test:10}
console.log(listaItems.find((value) => {
  return value[Object.keys(findObj)] === findObj[Object.keys(findObj)];
}));

findObj = {test:4}
console.log (listaItems.find((value) => {
  return value[Object.keys(findObj)] === findObj[Object.keys(findObj)];
}));
