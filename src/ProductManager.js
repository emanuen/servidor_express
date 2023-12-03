const fs = require('fs');

class ProductManager {

    products = []
    id = 1

    constructor(path) {
        this.path = path
    }

    async addProduct(fields) {

        if (!fields.title || !fields.description || !fields.price || !fields.thumbnail || !fields.code || !fields.stack) {
            console.log("There are empty fields");
            return
        }

        const codeExists = this.products.find(product => product.code === this.code)

        if (codeExists) {
            console.log("Code product already exists");
            return
        }

        fields.id = this.id
        this.id = this.id + 1

        this.products.push(fields)

        await fs.writeFileSync(this.path, JSON.stringify(this.products))
        console.log("Product added successfully");

    }

    async getProducts(limit) {

        const products = await fs.readFileSync(this.path, 'utf8');
        const showProducts = JSON.parse(products);

        if (limit) {
            console.log(showProducts.slice(0, limit));
            return
        }

        console.log(showProducts);

    }

    async getProductById(id) {

        const products = await fs.readFileSync(this.path, 'utf8');

        const product = JSON.parse(products).find(product => product.id === id)

        if (!product) {
            console.log("Product not found");
            return
        }

        console.log(product);
    }

    async updateProduct(id, fields) {

        const products = await fs.readFileSync(this.path, 'utf8');

        const product = JSON.parse(products).find(product => product.id === id)

        if (!product) {
            console.log("Product not found");
            return
        }

        for (const key of Object.keys(fields)) {
            product[key] = fields[key]
        }

        const productsUpdated = JSON.parse(products).map(prod => prod.id === id ? product : prod)

        await fs.writeFileSync(this.path, JSON.stringify(productsUpdated))

        console.log("Product updated successfully");

    }

    async deleteProduct(id) {

        const products = await fs.readFileSync(this.path, 'utf8');

        const product = JSON.parse(products).find(product => product.id === id)

        if (!product) {
            console.log("Product not found");
            return
        }

        const productRemoved = JSON.parse(products).filter(prod => prod.id !== id)

        await fs.writeFileSync(this.path, JSON.stringify(productRemoved))

        console.log("Product removed successfully");

    }

}

module.exports = ProductManager

