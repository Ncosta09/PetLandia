const productController = require('../controllers/productController');
const postMiddleware = require('../middlewares/postMiddleware');
const carritoMiddleware = require('../middlewares/carritoMiddleware');

const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const uploadFile = multer();

//buscar
router.get('/buscar', productController.buscarProductos);

//detalle
router.get('/producto/:idProducto', productController.productoDetalle);

//carrito
router.get('/carrito', carritoMiddleware, productController.carrito);

//crear
router.get('/crear', postMiddleware, productController.crearArticulo);
router.post('/crear', uploadFile.single('imagenProducto'), productController.creador);

//editar
router.get('/editar/:idProducto', productController.editarProducto);
router.put('/editar/:idProducto', uploadFile.single('imagenProducto'), productController.update);

//borrar
router.delete('/borrar/:idProducto', productController.destroy);


module.exports = router;