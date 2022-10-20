const express = require('express')
const app = express()
const puerto = 8080
const productos = [
    {
    "title": "Escuadra",
    "price": 123.45,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "id": 1
    },
    {
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "id": 2
    },
    {
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    "id": 3
    }
   ]

app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.get('/api/productos', (req, res) => {
    const { titulo } = req.query
    if(titulo) {
        const product = productos.filter(producto => {
            return producto.title.toLocaleLowerCase() === titulo.toLocaleLowerCase()
        })
        res.status(200).json(product)
    }
    res.json(productos)
})

app.get('/api/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    //const {id} = req.params

    if(isNan(id)) {
        res.status(400).json({ error: "El parametro no es un numero" })
        return
    }

    const product = productos.filter(producto => {
        return producto.id === id
    })

    if(!product.length) {
        res.status(404).send({ error: "El contenido que solicito no existe" })
        return
    }

    res.status(200).json(product)
})

app.post('/api/productos', (req, res) => {
    const { title, price, thumbnail } = req.body

    productos.push({title, price, thumbnail})
    res.sendStatus(201)
})

app.put('/api/productos', (req, res) => {
    const { title, price, thumbnail } = req.body
    console.log('REQ: ', req);
    productos.push({title, price, thumbnail})
    res.sendStatus(201)
})

app.delete('/api/productos/:id', (req, res) => {

    res.sendStatus(201)
})

app.listen(puerto, err => {
    if(err) {
        console.log(`Hubo un error al iniciar el servidor ${err}`);
    } else {
        console.log(`Servidor escuchando el puerto ${puerto}`);
    }
})