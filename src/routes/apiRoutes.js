const apiController = require('./../controllers/apiController');

const express = require('express');
const router = express.Router();

//Ruta de TODOS los Usuarios
router.get('/usuarios', apiController.usuarios)

//Ruta de Usuarios por ID
router.get('/busquedaUsuario', apiController.usuarioXId)

//Ruta de TODOS los Productos
router.get('/productos', apiController.productos)

//Ruta de Productos por ID
router.get('/busquedaProducto', apiController.productoXId)

//Ruta de TODOS los Filtros
router.get('/filtros', apiController.filtros)

module.exports = router;