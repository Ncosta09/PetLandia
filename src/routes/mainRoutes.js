const mainController = require('./../controllers/mainController')

const express = require('express');
const router = express.Router();

//index
router.get('/', mainController.index);

//todos los productos
router.get('/productos', mainController.todosProductos);

//todos los productos de una categoria
router.get('/productos/categoria/:idCategoria', mainController.productosXcategoria);

module.exports = router;