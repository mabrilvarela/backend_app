const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    precio: Number
})

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;