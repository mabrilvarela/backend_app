const ProductModel = require("../models/product.model.js");

class ProductRepository {
    async productList() {
        try {
            const products = await ProductModel.find();
            return products;
        } catch (error) {
            throw new Error("Error al obtener los productos");
        }
    }

    async create(productData) {
        try {
            return await ProductModel.create(productData)
        } catch (error) {
            throw new Error("Error al crear un juguete");
        }
    }
}

module.exports = ProductRepository;