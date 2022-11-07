
# **Backend Coderhouse - Clase 36: Tercera entrega del Proyecto Final**
 
*Se debe entregar:* 

 - Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro.
	 -	El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.
	 -	La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url.
 - Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.
	 - El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.
	 - Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.
 - Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.
	 - El usuario iniciará la acción de pedido en la vista del carrito.
	 - Será enviado una vez finalizada la elección para la realizar la compra de productos.
	 - El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.
	 - El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.

  

*Aspectos a incluir en el entregable:*

a. A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.

b. En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor (opcional: investigar el uso de imports dinámicos).

c. Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

*Aspectos a incluir:* 

 - El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku.
 - Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
 - Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido.
 - Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario una vez logueado). Verificar los resultados.

**Notas:**

### *Detalle de rutas*
Ruta|Metodo|Accion|Tipo parametros
-|-|-|-
/api/productos/|GET|Lista todos los productos|N/A
/api/productos/|POST|Agrega un nuevo producto|JSON
/api/productos/:id|GET|Obtiene el producto identificado por id|N/A
/api/productos/:id|PUT|Actualiza el producto identificado por id|JSON
/api/productos/:id|DELETE|Elimina el producto identificado por id|N/A
/api/carrito|POST|Crea un nuevo carrito|N/A
/api/carrito/:id|DELETE|Elimina el carrito identificado por id|N/A
/api/carrito/:id/productos/|GET|Devuelve el contenido del carrito identificado por id|N/A
/api/carrito/:id/productos/|POST|Agrega un producto al carrito id|JSON
/api/carrito/:id/productos/count|GET|Devuelve la cantidad de items en el carrito identificado por id|N/A
/api/carrito/:id/purchase|POST|Procesa la compra del contenido del carrito id|N/A
/api/carrito/:id/productos/|DELETE|Elimina todos los productos carrito|N/A
/api/carrito/:id/productos/:id_prod|DELETE|Elimina el producto id_prod del carrito id|N/A
/api/usuario/info|GET|Obtiene Nombre, mail y condicion de administrador del usuario|N/A
/api/usuario/profile|GET|Obtiene el perfil completo del usuario|N/A
/login|GET|Devuelve la pagina de login|N/A
/login|POST|Realiza el proceso de login|JSON
/signup|GET|Devuelve la pagina de registro|N/A
/signup|POST|Realiza el proceso de registro|multipart/form-data
/productos|GET|Devuelve la pagina de productos|N/A
/profile|GET|Devuelve la pagina de perfil de usuario|N/A
/cart|GET|Devuelve la pagina con el carrito|N/A


### *Resultado perfilamiento con Artillery*

En ambos casos se simularon 30VU por segundo, durante 8 minutos.

Resultado fork:
```
--------------------------------
Summary report @ 12:30:36(-0300)
--------------------------------

errors.ECONNREFUSED: ........................................................... 2396
errors.ETIMEDOUT: .............................................................. 11977
http.codes.200: ................................................................ 17188
http.codes.302: ................................................................ 8608
http.request_rate: ............................................................. 90/sec
http.requests: ................................................................. 40169
http.response_time:
  min: ......................................................................... 0
  max: ......................................................................... 9995
  median: ...................................................................... 90.9
  p95: ......................................................................... 8186.6
  p99: ......................................................................... 9607.1
http.responses: ................................................................ 25796
vusers.completed: .............................................................. 27
vusers.created: ................................................................ 14400
vusers.created_by_name.0: ...................................................... 14400
vusers.failed: ................................................................. 14373
vusers.session_length:
  min: ......................................................................... 3431.3
  max: ......................................................................... 11705
  median: ...................................................................... 8868.4
  p95: ......................................................................... 11274.1
  p99: ......................................................................... 11501.8
```

Resultado cluster:
```
--------------------------------
Summary report @ 12:40:44(-0300)
--------------------------------

errors.ETIMEDOUT: .............................................................. 14157
http.codes.200: ................................................................ 29431
http.codes.302: ................................................................ 14400
http.request_rate: ............................................................. 120/sec
http.requests: ................................................................. 57988
http.response_time:
  min: ......................................................................... 0
  max: ......................................................................... 9949
  median: ...................................................................... 1
  p95: ......................................................................... 5
  p99: ......................................................................... 4965.3
http.responses: ................................................................ 43831
vusers.completed: .............................................................. 243
vusers.created: ................................................................ 14400
vusers.created_by_name.0: ...................................................... 14400
vusers.failed: ................................................................. 14157
vusers.session_length:
  min: ......................................................................... 576.7
  max: ......................................................................... 19156.2
  median: ...................................................................... 11274.1
  p95: ......................................................................... 16819.2
  p99: ......................................................................... 18588.1

```

Como se puede observar hay una mejora de performance entre cluster y fork:

Parametro|fork|cluster
-|-|-
http.codes.200|17188|29431
http.request_rate|90/sec|120/sec

