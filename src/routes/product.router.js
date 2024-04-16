const express = require("express");
const router = express.Router(); 
const ProductController = require("../controllers/product.controller.js");
const productController = new ProductController(); 

router.get("/", productController.getProductos);
router.post("/", productController.postProductos);

module.exports = router;