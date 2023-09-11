const { log } = require('console');
const fs = require('fs');
const path = require('path');
let moment = require('moment');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

let db = require('../database/models');
let Op = db.sequelize.Op;

cloudinary.config({
	cloud_name: 'dkhiluh13',
	api_key: '773855392137736',
	api_secret: 'oEsjKvYVUOv0RE4R0Z3uQ9dk8a8',
});

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {

	productoDetalle: (req, res) => {
		let idProducto = req.params.idProducto;

		db.Producto.findByPk(idProducto)
		.then((resultado)  => { 
            res.render('producto', {producto: resultado, usuario: req.session.usuarioLogeado});
		});
	},

	carrito: (req, res) => {
		res.render('carrito');
	},

	crearArticulo: async (req, res) => {

		let categorias = await db.Categoria.findAll();
		let animales = await db.Animal.findAll();
		let marcas = await db.Marca.findAll();

		res.render('crear', {categorias, animales, marcas, usuario: req.session.usuarioLogeado});
	},

	creador: async (req, res) => {

		let fechaHoraActual = moment().format("YYYY-MM-DD HH:MM:SS");
		let cloudinaryImage = '';
	
		if (req.file) {
			const imageBuffer = req.file.buffer;
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
			const customFilename = 'producto_' + uniqueSuffix;
			const folder = 'ProductosImg';

			const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: folder, public_id: customFilename }, (error, result) => {

				console.log('Upload successful: ');
				cloudinaryImage = result.secure_url;
				
				db.Producto.create({
					Nombre: req.body.Nombre,
					Descripcion: req.body.Descripcion,
					Precio: req.body.Precio,
					Descuento: req.body.Descuento,
					Stock: req.body.Stock,
					Imagen: cloudinaryImage,
					Fecha_Creacion: fechaHoraActual,
					Categoria_FK: req.body.Categoria,
					Animal_FK: req.body.Animal,
					Marca_FK: req.body.Marca
				})
				.then(() => {
					res.redirect('/');
				});
			});

			streamifier.createReadStream(imageBuffer).pipe(stream);
		}
	},
	
	editarProducto: async (req, res) => {

		let idProducto = req.params.idProducto;

		let productos = await db.Producto.findByPk(idProducto);
		let categorias = await db.Categoria.findAll();
		let animales = await db.Animal.findAll();
		let marcas = await db.Marca.findAll();

		res.render('editar', {productoEnEdicion: productos, categorias, animales, marcas, usuario: req.session.usuarioLogeado});
	},

	update: (req, res) => {

		let fechaHoraActual = moment().format("YYYY-MM-DD HH:MM:SS");
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