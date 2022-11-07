## **Backend Coderhouse - Desafío 21 - Clase 42: Testeamos nuestra api rest**

**Consignas:**
Revisar en forma completa el proyecto entregable que venimos realizando, refactorizando y reformando todo lo necesario para llegar al esquema de servidor API RESTful en capas planteado en esta clase.
Asegurarse de dejar al servidor bien estructurado con su ruteo / controlador, negocio, validaciones, persistencia y configuraciones (preferentemente utilizando en la codificación clases de ECMAScript).
No hace falta realizar un cliente ya que utilizaremos tests para verificar el correcto funcionamiento de las funcionalidades desarrolladas.

 - Desarrollar un cliente HTTP de pruebas que utilice Axios para enviar peticiones, y realizar un test de la funcionalidad hacia la API Rest de productos, verificando la correcta lectura de productos disponibles, incorporación de nuevos productos, modificación y borrado.
 - Realizar el cliente en un módulo independiente y desde un código aparte generar las peticiones correspondientes, revisando los resultados desde la base de datos y en la respuesta del servidor obtenida en el cliente HTTP.
 - Luego, realizar las mismas pruebas, a través de un código de test apropiado, que utilice mocha, chai y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos.
 - Escribir una suite de test para verificar si las respuestas a la lectura, incorporación, modificación y borrado de productos son las apropiadas. Generar un reporte con los resultados obtenidos de la salida del test.

**Notas**
Los resultados de las pruebas fueron los siguientes:
Todos los test se encuentran en la carpeta test:
| Test | Carpeta |
|:--------:|:-------------:|
| Axios | \test\01-axios\ |
| Http | \test\02-http\ |
| Mocha |\test\03-mocha\ |
| Suite |\test\04-suite\ |

 1. Axios
 Se realizo el login con un usuario creado de manera aleatoria y luego se creó un nuevo producto, se consultó dicho producto, se eliminó y se volvió a consultar por el mismo producto, el resultado del script fue el siguiente:
```
\test\01-axios>node axios.test.js
Create test user
201
Login
200 { login: true }
Add new product
201 {
  id: '6341e653fbea4c7978ff7829',
  title: 'Teclado',
  price: 209,
  thumbnail: 'https://loremflickr.com/640/480/cats'
}
Get product info
200 {
  id: '6341e653fbea4c7978ff7829',
  title: 'Teclado',
  price: 209,
  thumbnail: 'https://loremflickr.com/640/480/cats'
}
Delete product
200 {
  title: 'Teclado',
  price: 209,
  thumbnail: 'https://loremflickr.com/640/480/cats',
  id: '6341e653fbea4c7978ff7829'
}
Get deleted product info
200 { id: null }
```

 2. Http
 Se realizaron las mismas operaciones que con Axios pero con la librería nativa http, el resultado fue:
```
\test\02-http>node http.test.js
Create test user {"username":"Lonny10","password":"T7PKcD2_5mEUJXp"}
201
Login {"username":"Lonny10","password":"T7PKcD2_5mEUJXp"}
200 {"login":true}
Add new product {"title":"Bacon","price":144,"thumbnail":"https://loremflickr.com/640/480/cats"}
201 {"id":"6341e974fbea4c7978ff783a","title":"Bacon","price":144,"thumbnail":"https://loremflickr.com/640/480/cats"}
Get product info  6341e974fbea4c7978ff783a
200 {"id":"6341e974fbea4c7978ff783a","title":"Bacon","price":144,"thumbnail":"https://loremflickr.com/640/480/cats"}
Delete product 6341e974fbea4c7978ff783a
200 {"title":"Bacon","price":144,"thumbnail":"https://loremflickr.com/640/480/cats","id":"6341e974fbea4c7978ff783a"}
Get deleted product info 6341e974fbea4c7978ff783a
200 {"id":null}
```

 3. Mocha
Con lo combinación Mocha/Supertest/Chai se realizo la misma secuencia de pruebas que en los casos anteriores con el siguiente resultado:
```
\test\03-mocha>npm test

> 03-mocha@1.0.0 test
> mocha ./mocha.test.js



  Testing product routes
    - POST /api/product
      √ Should return 201 (306ms)
      √ Should return the created product
    - GET /api/product/:id
      √ Should return 200 (240ms)
      √ Should return the created product
    - DELETE /api/product/:id
      √ Should return 200 (290ms)
      √ Should return the deleted product
    - GET /api/product/:id
      √ Should return 200 (229ms)
      √ Should return null id


  8 passing (2s)
``` 
 

 4. Suite completa
En este caso se repitió la combinación anterior se agregó el test del manejo de usuario y sesión. Con el siguiente resultado:
```
\>npm test

> api_test@1.0.0 test
> mocha ./test/04-suite/*.test.js



  Testing product routes
    - POST /api/product
      √ Should return 201 (311ms)
      √ Should return the created product
    - GET /api/product/:id
      √ Should return 200 (242ms)
      √ Should return the created product
    - DELETE /api/product/:id
      √ Should return 200 (290ms)
      √ Should return the deleted product
    - GET /api/product/:id
      √ Should return 200 (236ms)
      √ Should return null id

  Testing user routes
    - POST /signup
      √ Should return 201 (507ms)
    - POST /login
      √ Should return 200 (395ms)
    - GET /user
      √ Should return 200 (236ms)
      √ Should return logged in user
    - GET /logout
      √ Should return 200 (304ms)
    - GET /user
      √ Should return 401


  14 passing (4s)

```

