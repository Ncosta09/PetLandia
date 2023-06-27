const productController = require('../controllers/productController')

const express = require('express');
const router = express.Router();

router.get('/producto', productController.productoDetalle)

router.get('/carrito', productController.carrito)

module.exports = router;