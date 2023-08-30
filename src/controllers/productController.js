const { log } = require('console');
const fs = require('fs');
const path = require('path');
let moment = require('moment');
let db = require('../database/models');

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

		let fechaHoraActual = moment().format("YYYY-MM-DD hh:mm:ss");

		db.Producto.create({
			Nombre: req.body.Nombre,
			Descripcion: req.body.Descripcion,
			Precio: req.body.Precio,
			Descuento: req.body.Descuento,
			Stock: req.body.Stock,
			Imagen: req.file.filename,
			Fecha_Creacion: fechaHoraActual,
			Animal_FK: req.body.Animal,
			Marca_FK: req.body.Marca,
			Categoria_FK: req.body.Categoria
		})

		/*let datosFormulario = req.body;
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
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' ')); */
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
				obj.info = req.body.Informacion;
				if(req.file) {
					obj.image = req.file.filename;
					} 
					else{
					obj.image = products.image;
					}
				break;
			}
		}

		if(req.file){

		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
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