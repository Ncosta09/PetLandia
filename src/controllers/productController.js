const { log } = require('console');
const fs = require('fs');
const path = require('path');
let moment = require('moment');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

let db = require('../database/models');
const { Op } = require('sequelize');

cloudinary.config({
	cloud_name: 'dkhiluh13',
	api_key: '773855392137736',
	api_secret: 'oEsjKvYVUOv0RE4R0Z3uQ9dk8a8',
});

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {

	buscarProductos: async (req, res) => {
		let terminoBusqueda = req.query.q;
	  
		if (terminoBusqueda) {
		  let productos = await db.Producto.findAll({
			where: {
			  Nombre: {
				[Op.like]: `%${terminoBusqueda}%`, // Búsqueda insensible a mayúsculas y minúsculas
			  },
			},
		  });
	  
		  let categorias = await db.Categoria.findAll();
		  let animales = await db.Animal.findAll();
		  let marcas = await db.Marca.findAll();
	  
		  res.render('buscar', {productos, categorias, animales, marcas, terminoBusqueda, usuario: req.session.usuarioLogeado});

		} else {

		  let productos = await db.Producto.findAll();
		  let categorias = await db.Categoria.findAll();
		  let animales = await db.Animal.findAll();
		  let marcas = await db.Marca.findAll();
	  
		  res.render('buscar', {productos, categorias, animales, marcas, terminoBusqueda, usuario: req.session.usuarioLogeado});
		}
	},

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

	finalizarVenta: async (req, res) => {
		const fechaHoraActual = moment().format("YYYY-MM-DD HH:mm:ss");
		const { carrito } = req.body;
		const usuarioId = req.session.usuarioLogeado.ID;
		
		let precioTotal = 0;
		let cantidadTotal = 0;
		let costoEnvioTotal = 0;
	  
		for (const producto of carrito) {
			const precioUnitario = producto.precio * producto.cantidad;
			
			precioTotal += precioUnitario;
			cantidadTotal += producto.cantidad;
			costoEnvioTotal += producto.envio;
		}
		
		const nuevaVenta = await db.Venta.create({
		  Precio_Total: precioTotal,
		  Cantidad_Total: cantidadTotal,
		  Direccion: null,
		  Fecha: fechaHoraActual,
		  Usuario_FK: usuarioId,
		  Medio_Pago_FK: null,
		  Costo_Envio: costoEnvioTotal,
		});
		
		for (const producto of carrito) {
		  await db.DetalleVenta.create({
			Venta_FK: nuevaVenta.id,
			Producto_FK: producto.id,
			Precio_Unidad: producto.precio,
			Cantidad: producto.cantidad,
			Descuento: producto.descuento,
			Envio: producto.envio,
		  });
		}
		
		res.json({ mensaje: 'Venta exitosa' });
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
					Envio: req.body.Envio,
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

	agregarCatMar: (req, res) => {
		const nuevaMarca = req.body.nuevaMarca;
		const nuevaCategoria = req.body.nuevaCategoria;
	  
		if (nuevaMarca) {
		  db.Marca.create({
			Nombre: nuevaMarca
		  })
		  .then(() => {
			res.redirect('/producto/crear');
		  });
		}
	  
		if (nuevaCategoria) {
		  db.Categoria.create({
			Nombre: nuevaCategoria
		  })
		  .then(() => {
			res.redirect('/producto/crear');
		  });
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

	update: async (req, res) => {
		console.log("Entrando al controlador de edición");
	
		
		let fechaHoraActual = moment().format("YYYY-MM-DD HH:MM:SS");
		let idProducto = req.params.idProducto;

		let updateData = {
			Nombre: req.body.Nombre,
			Descripcion: req.body.Descripcion,
			Precio: req.body.Precio,
			Descuento: req.body.Descuento,
			Stock: req.body.Stock,
			Envio: req.body.Envio,
			Fecha_Modificacion: fechaHoraActual,
			Animal_FK: req.body.Animal,
			Marca_FK: req.body.Marca,
			Categoria_FK: req.body.Categoria,
		};

		console.log("Contenido de req.file:", req.file);
	
		if (req.file) {
			console.log("Se encontró un archivo adjunto");

			let imageBuffer = req.file.buffer;
			let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
			let customFilename = 'producto_' + uniqueSuffix;
			let folder = 'ProductosImg';

			cloudinary.uploader.upload_stream({ resource_type: 'image', folder: folder, public_id: customFilename }, (error, result) => {

				console.log("URL de imagen en Cloudinary:", result.secure_url);

				updateData.Imagen = result.secure_url;

				db.Producto.update(updateData, {
					where: {
						ID: idProducto
					}
				})
				.then(()  => { 
					console.log("Actualización exitosa");

					res.redirect('/producto/producto/' + idProducto);
				});

			}).end(imageBuffer);

		} else {
			console.log("No se encontró un archivo adjunto");

			db.Producto.update(updateData, {
				where: {
					ID: idProducto
				}
			})
			.then(()  => { 
				console.log("Actualización exitosa");
				res.redirect('/producto/producto/' + idProducto);
			});
		}
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