const mainController = require('./../controllers/mainController')

const express = require('express');
const router = express.Router();

//index
router.get('/', mainController.index);

//todos los productos
router.get('/productos', mainController.todosProductos);

//todos los productos de animal
router.get('/productos/categoria/animales/:idAnimal', mainController.productosAnimal);

//todos los productos de categoria
router.get('/productos/categoria/categorias/:idCategoria', mainController.productosCategoria);

//todos los productos de Marcas
router.get('/productos/categoria/marcas/:idMarca', mainController.productosMarca);

module.exports = router;