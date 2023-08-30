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

		db.Producto.findByPk(idProducto)
		.then((resultado)  => { 
            res.render('producto', {producto: resultado});
		});
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
		.then(()  => { 
			res.redirect('/');
		});
	},

	editarProducto: (req, res) => {

		let idProducto = req.params.idProducto;

		db.Producto.findByPk(idProducto)
		.then((resultado)  => { 
            res.render('editar', {productoEnEdicion: resultado});
		});
	},

	update: (req, res) => {

		let fechaHoraActual = moment().format("YYYY-MM-DD hh:mm:ss");
		let idProducto = req.params.idProducto;

		let updateData = {
			Nombre: req.body.Nombre,
			Descripcion: req.body.Descripcion,
			Precio: req.body.Precio,
			Descuento: req.body.Descuento,
			Stock: req.body.Stock,
			Fecha_Modificacion: fechaHoraActual,
			Animal_FK: req.body.Animal,
			Marca_FK: req.body.Marca,
			Categoria_FK: req.body.Categoria,
		};

		if (req.file) {
			updateData.Imagen = req.file.filename;
		} else {
			updateData.Imagen = products.Imagen;
		}

		db.Producto.update(updateData, {
			where: {
				ID: idProducto
			}
		})
		.then(()  => { 
            res.redirect('/producto/producto/' + idProducto);
		});
	},

	destroy: (req, res) => {
		let fechaHoraActual = moment().format("YYYY-MM-DD HH:MM:SS");
		let idProducto = req.params.idProducto; 

		db.Producto.update({
			Fecha_Eliminacion: fechaHoraActual
		}, {
			where: {
				ID: idProducto
			}
		})
		.then(() => {
			db.Producto.destroy({
				where: {
					ID: idProducto
				}
			})
		})
		.then(()  => { 
			res.redirect('/');
		});
	},

}

module.exports = productController;