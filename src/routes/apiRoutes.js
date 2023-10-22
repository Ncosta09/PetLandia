const apiController = require('./../controllers/apiController');

const express = require('express');
const router = express.Router();

//Ruta de TODOS los Usuarios
router.get('/usuarios', apiController.usuarios)

//Ruta de Usuarios por ID
router.get('/busquedaUsuario/:id', apiController.usuarioXId)

//Ruta de TODOS los Productos
router.get('/productos', apiController.productos)

//Ruta de Productos por ID
router.get('/busquedaProducto/:id', apiController.productoXId)

//Ruta de TODAS las Ventas
router.get('/ventas', apiController.ventas)

// //Ruta de Ventas por ID
router.get('/busquedaVentas/:id', apiController.ventaXId)

//Ruta de TODOS los Filtros
router.get('/filtros', apiController.filtros)

module.exports = router;