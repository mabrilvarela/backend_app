const ProductRepository = require("../repositories/products.repository.js");
const productRepository = new ProductRepository(); 

class ProductController {
    async getProducts(req, res) {
        try {
            const products = await productRepository.productList();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json("Error del servidor");
        }
    }

    async postProductos(req, res) {
        const newProduct = req.body;
        try {
            await productRepository.create(newProduct);
            res.status(200).send("Producto creado");
        } catch (error) {
            res.status(500).json("Error del servidor");
        }
    }
}

module.exports = ProductController;