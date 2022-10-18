/* //Servidor HTTP
const http = require('http')
const puerto = 8080

const server = http.createServer((req, res) => {
    console.log('Llego una peticion');
    res.end('Bienvenido a nuestro servidor http')
})

server.listen(puerto, () => {
    console.log(`Servidor escuchando puerta: ${puerto}`)
})
*/

/*
const http = require ('http')

const server = http.createServer((req, res) => {
    const tiempo = new Date ()
    const hora = tiempo.getHours()
    
    if(hora >= 6 && hora <= 12) {
        res.end('Buenos dias')
    } else if (hora >= 13 && hora <= 19) {
        res.end('Buenas tardes')
    } else {
        res.end('Buenas noches')
    }
})

server.listen(8088, () => {
    console.log("El servidor esta escuchando el puerto 8080");
})
*/
//Servidor con Express
/*
const express = require('express')
const app = express()
const puerto = 8089

app.get('/', (req, res) => {
    res.send('Hola soy home')
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id

    res.send(`Hola soy user: ${id}`)
})

app.get('/productos/ropa', (req, res) => {
    res.send('Hola soy productos ropa')
})

app.listen(puerto, () =>{
    console.log(`El servidor se incio en el puerto ${puerto}`);
})
*/
//Ejercicios express
const express = require('express')
const app = express()
const puerto = 8089
let visitas =  0

app.use((req, res, next) => {
    visitas++
    next()
})

app.get('/', (req, res) => {
    res.send('<h1 style="color:blue">Bienvenidos al servidor Express<h1>');
})
app.get('/visitas', (req, res) => {
    visitas++
    res.send(`La cantidad de visitas es ${visitas}`)
})
app.get('/fyh', (req, res) => {
    const date = new Date()
    res.json({fyh: date})
})

app.listen(puerto, (error) => { //segundo parametro es un Callback
    if (!error) {
        console.log(`El servidor se inicio en el puerto ${puerto}`);
    } else {
        console.log('Hubo un error al iniciar el servidor:', error);
    }
})