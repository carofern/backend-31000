 -  Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.

Al ejecutar el servidor con nodemon en modo fork `nodemon src/server.js` aparecieron 2 procesos de node:

Nombre de imagen|PID |Nombre de sesión|Núm. de ses |Uso de memor
-|-:|-|-:|-:
node.exe|5764|Console|1|34,268 KB
node.exe|14476|Console|1|103,048 KB

Al ejecutar el servidor con nodemon en modo clúster `nodemon src/server.js --modo cluster` aparecieron 14 procesos siendo 12 el numero de procesadores:
Nombre de imagen|PID |Nombre de sesión|Núm. de ses |Uso de memor
-|-:|-|-:|-:
node.exe|20540|Console|1|34,844 KB
node.exe|20428|Console|1|103,004 KB
node.exe|5352|Console|1|102,560 KB
node.exe|16080|Console|1|102,520 KB
node.exe|22520|Console|1|102,464 KB
node.exe|7248|Console|1|101,592 KB
node.exe|9452|Console|1|101,868 KB
node.exe|13912|Console|1|102,784 KB
node.exe|14364|Console|1|102,916 KB
node.exe|18732|Console|1|102,844 KB
node.exe|7140|Console|1|102,972 KB
node.exe|22260|Console|1|102,756 KB
node.exe|18756|Console|1|102,560 KB
node.exe|19100|Console|1|102,488 KB

 -  Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.

Luego de ejecutar el servidor en modo fork: `forever start --watch src/server.js`

Forever muestra un solo proceso en ejecución:
```
>forever list
info:    Forever processes running
data:        uid  command                            script                                                                                        forever pid   id logfile                            uptime
data:    [0] 2ldW  "D:\Program Files\nodejs\node.exe" D:\Coderhouse\Desafios\15 - Servidor con balance de carga\src\server.js 5616    18448    C:\Users\usuario\.forever\2ldW.log 0:0:0:53.218
```
Y al igual que la ejecucion con nodemon el sistema operativo muestra 2 instancias de node en ejecuacion.

 - Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
El ejecutar: `pm2 start src/server.js --watch` se muestran los siguientes procesos:
```
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ server    │ default     │ 1.0.0   │ fork    │ 9956     │ 3m     │ 0    │ online    │ 0%       │ 94.5mb   │ usuario  │ disabled │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```
Al igual que los casos anteriores se muestran 2 procesos de node en ejecución.

Luego de ejecutar el comando: `pm2 start src/server.js -i max
pm2 --watch` muestra los siguientes procesos
```
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ server    │ default     │ 1.0.0   │ cluster │ 5780     │ 1s     │ 0    │ online    │ 0%       │ 98.0mb   │ usuario  │ disabled │
│ 1   │ server    │ default     │ 1.0.0   │ cluster │ 20816    │ 1s     │ 0    │ online    │ 0%       │ 97.6mb   │ usuario  │ disabled │
│ 2   │ server    │ default     │ 1.0.0   │ cluster │ 23176    │ 1s     │ 0    │ online    │ 0%       │ 91.9mb   │ usuario  │ disabled │
│ 3   │ server    │ default     │ 1.0.0   │ cluster │ 7232     │ 1s     │ 0    │ online    │ 0%       │ 90.8mb   │ usuario  │ disabled │
│ 4   │ server    │ default     │ 1.0.0   │ cluster │ 7136     │ 1s     │ 0    │ online    │ 0%       │ 88.4mb   │ usuario  │ disabled │
│ 5   │ server    │ default     │ 1.0.0   │ cluster │ 22760    │ 1s     │ 0    │ online    │ 0%       │ 80.6mb   │ usuario  │ disabled │
│ 6   │ server    │ default     │ 1.0.0   │ cluster │ 3180     │ 1s     │ 0    │ online    │ 0%       │ 75.6mb   │ usuario  │ disabled │
│ 7   │ server    │ default     │ 1.0.0   │ cluster │ 19468    │ 1s     │ 0    │ online    │ 0%       │ 71.2mb   │ usuario  │ disabled │
│ 8   │ server    │ default     │ 1.0.0   │ cluster │ 8352     │ 1s     │ 0    │ online    │ 0%       │ 65.2mb   │ usuario  │ disabled │
│ 9   │ server    │ default     │ 1.0.0   │ cluster │ 14828    │ 1s     │ 0    │ online    │ 0%       │ 61.7mb   │ usuario  │ disabled │
│ 10  │ server    │ default     │ 1.0.0   │ cluster │ 2620     │ 1s     │ 0    │ online    │ 0%       │ 58.4mb   │ usuario  │ disabled │
│ 11  │ server    │ default     │ 1.0.0   │ cluster │ 22864    │ 0s     │ 0    │ online    │ 0%       │ 45.8mb   │ usuario  │ disabled │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```
Mientras que el sistema operativo muestra 13 procesos de node en ejecución.

