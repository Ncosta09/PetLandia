let db = require('../database/models');
let { Op } = require('sequelize');
const { todosProductos } = require('./mainController');

const apiController = {

    usuarios: (req, res) => {
        db.Usuario.findAll({
            attributes: { 
                exclude: ['Password'] 
            }
        })
        .then(usuarios => {
            res.json({
                total: usuarios.length,
                data: usuarios
            });
        })
    },

    usuarioXId: (req, res) => {
        db.Usuario.findOne({
            where: {
                ID: req.query.keyword
            }, 
            attributes: { 
                exclude: ['Password'] 
            }
        })
        .then(usuario => {
            res.json({ usuario });
        });
    },
            
    productos: async (req, res) => {
        
        todosProd = await db.Producto.findAll({
            include: [
                {
                    model: db.Categoria,
                    as: 'Categorias',
                    attributes: ['Nombre'],
                },
                {
                    model: db.Animal,
                    as: 'Animales',
                    attributes: ['Nombre'],
                },
                {
                    model: db.Marca,
                    as: 'Marcas',
                    attributes: ['Nombre'],
                }
            ],
            attributes: {
                exclude: ['Categoria_FK', 'Animal_FK', 'Marca_FK']
            }    
        });
        
        prodCategorias = await db.Producto.findAll({
            attributes: [
                [db.sequelize.col('Categorias.Nombre'), 'Categoria'],
                [db.sequelize.fn('COUNT', 'id'), 'count']
            ],
            include: {
                model: db.Categoria,
                as: 'Categorias',
                attributes: [],
            },
            group: [db.sequelize.col('Categorias.Nombre')],
            raw: true
        });

        prodAnimales = await db.Producto.findAll({
            attributes: [
                [db.sequelize.col('Animales.Nombre'), 'Animal'],
                [db.sequelize.fn('COUNT', 'id'), 'count']
            ],
            include: {
                model: db.Animal,
                as: 'Animales',
                attributes: [],
            },
            group: [db.sequelize.col('Animales.Nombre')],
            raw: true
        });

        prodMarcas = await db.Producto.findAll({
            attributes: [
                [db.sequelize.col('Marcas.Nombre'), 'Marca'],
                [db.sequelize.fn('COUNT', 'id'), 'count']
            ],
            include: {
                model: db.Marca,
                as: 'Marcas',
                attributes: [],
            },
            group: [db.sequelize.col('Marcas.Nombre')],
            raw: true
        });

        res.json({
            total: todosProd.length,
            data: todosProd,
            prodCategorias: prodCategorias,
            prodAnimales: prodAnimales,
            prodMarcas: prodMarcas
        });

    },

    productoXId: (req, res) => {
        db.Producto.findOne({
            where: {
                ID: req.query.keyword
            }, 
            include: [
                {
                    model: db.Categoria,
                    as: 'Categorias',
                    attributes: ['Nombre'],
                },
                {
                    model: db.Animal,
                    as: 'Animales',
                    attributes: ['Nombre'],
                },
                {
                    model: db.Marca,
                    as: 'Marcas',
                    attributes: ['Nombre'],
                }
            ],
            attributes: {
                exclude: ['Categoria_FK', 'Animal_FK', 'Marca_FK']
            }    
        })
        .then(usuario => {
            res.json({ usuario });
        });
    },

    filtros: async (req, res) => {

        let categorias = await db.Categoria.findAll();
        let animals = await db.Animal.findAll();
        let marcas = await db.Marca.findAll();

        res.json({
            categoria: categorias,
            animal: animals,
            marca: marcas,
        })

    }

}

module.exports = apiController;