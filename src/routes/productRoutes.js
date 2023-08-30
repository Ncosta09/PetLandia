const productController = require('../controllers/productController')

const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');

//Multer
const configuracionImagen = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/images/products'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName =  Date.now() + file.originalname ;   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: configuracionImagen });

//detalle
router.get('/producto/:idProducto', productController.productoDetalle);

//carrito
router.get('/carrito', productController.carrito);

//crear
router.get('/crear', productController.crearArticulo);
router.post('/crear', uploadFile.single('imagenProducto'), productController.creador);

//editar
router.get('/editar/:idProducto', productController.editarProducto);
router.put('/editar/:idProducto', uploadFile.single('imagenProducto'), productController.update);

//borrar
router.delete('/borrar/:idProducto', productController.destroy);


module.exports = router;