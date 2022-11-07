## **Segunda entrega del Proyecto Final**

  

*Consigna:* Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

  

*Aspectos a incluir en el entregable:*

a. A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.

b. En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor (opcional: investigar el uso de imports dinámicos).

c. Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

  

*Opcional:*

Hacer lo mismo para bases de datos relacionales: MariaDB/SQLite3.

  

**Notas:**

*Características opcionales incluidas:*

- Se incluyen los daos para MySQL y SQLite3.

- Se incorporan imports dinámicos (src/daos/carritos/carritosDAO.js y src/daos/productos/productosDAO.js).

  

*Características no solicitadas:*

- Se incluye frontend funcional

  

*Descripción general de funcionalidad*

- El archivo **config/contenedoresConfig.js** contiene los detalles de las diferentes conexiones.

- El archivo **config/daoConfig.js** determina que DAO se utiliza para productos y carritos mediante **dao_carritos** y **dao_productos** los posibles valores son todos los daos disponibles: **DAO_ARCHIVOS**, **DAO_FIREBASE**, **DAO_MEMORIA**, **DAO_MONGODB**, **DAO_MYSQL** y **DAO_SQLITE3**.

- Las conexiones a MongoDB (Atlas), Firebase y Archivo se encuentran disponibles directamente para su uso con datos de prueba.

- En caso de querer utilizar **SQLite3** o **MySQL** deberá crear la tablas, para este fin se pueden usar **test/crearBasesSQLite.js** y **test/crearBasesMySQL.js** respectivamente.

- Para restablecer los datos de prueba, una vez configurado el valor de **dao_productos** se puede usar **test/insertProductSampleData.js**

- Finalmente se incluyen **test/testDaosCarritos.js** y **test/testDaosProductos.js** para probar los diferentes DAOS.



