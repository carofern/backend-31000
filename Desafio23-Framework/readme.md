## **Backend Coderhouse - Desafío 23 - Clase 46: Reformar para usar otro framework**

**Consigna:**
Elegir uno de los frameworks vistos en clase y trasladar a esta nueva plataforma el último proyecto entregable (con GraphQL) o al anterior (sin GraphQL).
Verificar el correcto funcionamiento del servidor a nivel de sus rutas, vistas, lógica de negocio y persistencia.

**Notas**

El framework seleccionado fue *Koa*

URL de la api de productos: `http://localhost:8080/api/productos`

### *Detalle de rutas*
Ruta|Metodo|Accion|Tipo parametros
-|-|-|-
/api/productos/|GET|Lista todos los productos|N/A
/api/productos/|POST|Agrega un nuevo producto|JSON
/api/productos/:id|GET|Obtiene el producto identificado por id|N/A
/api/productos/:id|PUT|Actualiza el producto identificado por id|JSON
/api/productos/:id|DELETE|Elimina el producto identificado por id|N/A
