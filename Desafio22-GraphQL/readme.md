## **Backend Coderhouse - Desafío 22 - Clase 44: Reformar para usar GraphQL**

**Consigna:**
 - En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL. 
 - Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.
 - Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.


**Notas**

La url para acceder a la interfaz de GraphiQL es: `http://localhost:8080/api/graphql`

Los productos agregados desde el frontend son agregados mediante query de GraphQL

Se realizaron las siguientes queries de prueba:

**Obtener todos los productos**

*Query*
```
query getallprod {
  getProductos {
    id
    title
    price
    thumbnail
  }
}
```
*Resultado*
```
{
  "data": {
    "getProductos": [
      {
        "id": "6349ada858bd738b45916d00",
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
      },
      {
        "id": "6349ada858bd738b45916d02",
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
      },
      {
        "id": "6349ada858bd738b45916d04",
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
      }
    ]
  }
}
```


**Agregar un nuevo producto**

*Query*
```
mutation addprod {
  createProducto(datos: {title: "producto de prueba", price: 123.45, thumbnail: "http://image.com/231.jpg"}) {
    id
    title
    price
    thumbnail
  }
}
```
*Resultado*
```
{
  "data": {
    "createProducto": {
      "id": "6349b623a60bda34b587b8ce",
      "title": "producto de prueba",
      "price": 123.45,
      "thumbnail": "http://image.com/231.jpg"
    }
  }
}
```


**Consultar producto**

*Query*
```
query getprod {
  getProducto(id: "6349b623a60bda34b587b8ce") {
    id
    title
    price
    thumbnail
  }
}
```
*Resultado*
```
{
  "data": {
    "getProducto": {
      "id": "6349b623a60bda34b587b8ce",
      "title": "producto de prueba",
      "price": 123.45,
      "thumbnail": "http://image.com/231.jpg"
    }
  }
}
```


**Actualizar un producto**

*Query*
```
mutation modifprod {
  updateProducto(id: "6349b623a60bda34b587b8ce", datos: {title: "producto de prueba actualizado", price: 124, thumbnail: "http://urlmodificada.com"}) {
    id
    title
    price
    thumbnail
  }
}
```
*Resultado*
```
{
  "data": {
    "updateProducto": {
      "id": "6349b623a60bda34b587b8ce",
      "title": "producto de prueba actualizado",
      "price": 124,
      "thumbnail": "http://urlmodificada.com"
    }
  }
}
```


**Eliminar un producto**

*Query*
```
mutation elimprod {
  deleteProducto(id: "6349b623a60bda34b587b8ce") {
    id
    title
    price
    thumbnail
  }
}
```

*Resultado*
```
{
  "data": {
    "deleteProducto": {
      "id": "6349b623a60bda34b587b8ce",
      "title": "producto de prueba actualizado",
      "price": 124,
      "thumbnail": "http://urlmodificada.com"
    }
  }
}
```
