const { log } = require('console');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {

    productoDetalle: (req, res) => {
        let idProducto = req.params.idProducto;
        let productoDetalle;

        for(let obj of products){
            if(obj.id == idProducto){
                productoDetalle = obj;
                break;
            }
        }
        res.render('producto', {producto: productoDetalle});
    },

    crearArticulo: (req, res) => {
        res.render('crear');
    },

    creador: (req, res) => {

        let datosFormulario = req.body;
		let idNuevoProducto = (products[products.length-1].id)+1;

        let nombreImagen = req.file.filename;
		
		let objNuevoProducto = {
			id: idNuevoProducto,
			name: datosFormulario.Nombre,
			price: parseInt(datosFormulario.Precio),
			discount: parseInt(datosFormulario.Descuento),
			category: datosFormulario.Categoria,
			description: datosFormulario.Descripcion,
            info: datosFormulario.Informacion,
			image: nombreImagen
		}

		products.push(objNuevoProducto);
		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));
		res.redirect('/');
    },

    carrito: (req, res) => {
        res.render('carrito');
    }
}

module.exports = productController;