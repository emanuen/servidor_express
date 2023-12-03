const express = require('express')
const ProductManager = require('./ProductManager');
const path = require('path');

const app = express()

app.get('/products', async (req, res) => {

    const { limit } = req.query

    const productManager = new ProductManager("products.txt")

    return await productManager.getProducts(limit)

})

app.get('/products/:pid', async (req, res) => {

    const { pid } = req.params

    const productManager = new ProductManager("products.txt")

    return await productManager.getProductById(parseInt(pid))

})

app.use(express.static(path.join(__dirname, "../products.txt")))

app.listen(3000, () => {
    console.log("Servidor corriendo");
})