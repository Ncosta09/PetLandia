const { log } = require('console');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {

	productoDetalle: (req, res) => {
		let idProducto = req.params.idProducto;
		let productoDetalle;

		for (let obj of products) {
			if (obj.id == idProducto) {
				productoDetalle = obj;
				break;
			}
		}
		res.render('producto', { producto: productoDetalle });
	},

	carrito: (req, res) => {
		res.render('carrito');
	},

	crearArticulo: (req, res) => {
		res.render('crear');
	},

	creador: (req, res) => {

		let datosFormulario = req.body;
		let idNuevoProducto = (products[products.length - 1].id) + 1;

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
		fs.writeFileSync(productsFilePath, JSON.stringify(producto, null, ' '));
		res.redirect('/');
	},

	editarProducto: (req, res) => {
		let idProducto = req.params.idProducto;
		let productoEnEdicion;

		for (let obj of products) {
			if (obj.id == idProducto) {
				productoEnEdicion = obj;
				break;
			}
		}

		res.render('editar', { productoEnEdicion });
	},
	update: (req, res) => {

		let idProducto = req.params.idProducto;

		for (let obj of products) {
			if (obj.id == idProducto) {
				obj.name = req.body.Nombre;
				obj.price = parseInt(req.body.Precio);
				obj.discount = parseInt(req.body.Descuento);
				obj.category = req.body.Categoria;
				obj.description = req.body.Descripcion;
				break;
			}
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(producto, null, ' '));
		res.redirect('/');

	},

	destroy: (req, res) => {
		let idProducto = req.params.idProducto;

		let nuevoArregloProductos = products.filter(function (e) {
			return e.id != idProducto;
		});

		fs.writeFileSync(productsFilePath, JSON.stringify(nuevoArregloProductos, null, ' '));
		res.redirect('/');
	},

	
}

module.exports = productController;