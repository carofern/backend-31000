## **Servidor NGINX**

Se incluye el archivo de configuracion de NGINX en la carpeta raiz de la entrega.

Detalles para iniciar los servidores para que funcionen 

Servidor puerto 8080
`pm2 start src/server.js`

Servidor puerto 8082
`pm2 start src/server.js --name="server2" -- --puerto 8082`

Servidor puerto 8083
`pm2 start src/server.js --name="server3" -- --puerto 8083`

Servidor puerto 8084
`pm2 start src/server.js --name="server4" -- --puerto 8084`

Servidor puerto 8085
`pm2 start src/server.js --name="server5" -- --puerto 8085`

