const fs = require('fs');
const path = require('path');
let db = require('../database/models');

const mainController = {
    index: async (req, res) => {
		let animales = await db.Animal.findAll();
		let marcas = await db.Marca.findAll();
        let productos = await db.Producto.findAll();

        res.render('index', {productos, marcas, animales, usuario: req.session.usuarioLogeado});
    },

    todosProductos: async (req, res) => {
        
        let categorias = await db.Categoria.findAll();
		let animales = await db.Animal.findAll();
		let marcas = await db.Marca.findAll();
        let productos = await db.Producto.findAll();

        res.render('todosProductos', {productos, marcas, animales, categorias, usuario: req.session.usuarioLogeado});
    },

    productosAnimal: async (req, res) => {
		let nombreAnimal = req.params.idAnimal;

        if(nombreAnimal == 'Perro'){
            idAnimal = 1;
        }else if(nombreAnimal == 'Gato'){
            idAnimal = 2;
        }else if(nombreAnimal == 'Roedor'){
            idAnimal = 3;
        }else if(nombreAnimal == 'Ave'){
            idAnimal = 4;
        }else if(nombreAnimal == 'Pez'){
            idAnimal = 5;
        }

        let productos = await db.Producto.findAll({ 
            where: { 
                Animal_FK: idAnimal
            }
        });
		let categorias = await db.Categoria.findAll();
		let animales = await db.Animal.findAll();
		let marcas = await db.Marca.findAll();

		res.render('productosAnimal', {productoXAnimal: productos, categorias, animales, marcas, usuario: req.session.usuarioLogeado});
    },

    //ACA --------------------------------------------------------------------

    productosCategoria: async (req, res) => {
		let nombreCategoria = req.params.idCategoria;

        let categoria = await db.Categoria.findOne({
            where: {
                nombre: nombreCategoria
            }
        });

        let productos = await db.Producto.findAll({ 
            where: { 
                Categoria_FK: categoria.ID
            }
        });

		let categorias = await db.Categoria.findAll();
		let animales = await db.Animal.findAll();
		let marcas = await db.Marca.findAll();

		res.render('productosCategoria', {productoXCategoria: productos, categorias, animales, marcas, usuario: req.session.usuarioLogeado});
    },

    productosMarca: async (req, res) => {
		let nombreMarca = req.params.idMarca;

        let marca = await db.Marca.findOne({
            where: {
                nombre: nombreMarca
            }
        });

        let productos = await db.Producto.findAll({ 
            where: { 
                Marca_FK: marca.ID
            }
        });

		let categorias = await db.Categoria.findAll();
		let animales = await db.Animal.findAll();
		let marcas = await db.Marca.findAll();

		res.render('productosMarca', {productoXMarca: productos, categorias, animales, marcas, usuario: req.session.usuarioLogeado});
    }
}

module.exports = mainController;