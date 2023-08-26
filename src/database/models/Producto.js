function producto(sequelize, Datatypes){

    let alias = 'Productos';

    let cols = {
        ID: {
            type: Datatypes.INTEGER, 
            primarykey: true,
            autoincrement: true
        },
        Nombre: {
            type: Datatypes.STRING(30)
        },
        Descripcion: {
            type: Datatypes.STRING(100)
        },
        Imagen: {
            type: Datatypes.STRING(50)
        },
        Precio: {
            type: Datatypes.DECIMAL(10,2)
        },
        Stock: {
            type: Datatypes.INTEGER
        },
        Fecha_Creacion: {
            type: Datatypes.DATE
        },
        Fecha_Modificacion: {
            type: Datatypes.DATE
        },
        Fecha_Eliminacion: {
            type:Datatypes.DATE
        },

        //foreignKeys
        Animal_FK: {
            type: Datatypes.INTEGER
        },
        Marca_FK: {
            type: Datatypes.INTEGER
        },  
        Categoria_FK: {
            type: Datatypes.INTEGER
        }
    }

    let config = {
        camelcase: false,
        timestamps: false
    }
    
    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(modelos){
        Producto.hasMany(modelos.Venta, { 
            foreignKey: 'Producto_FK',
            as: 'Ventas' 
        });
        Producto.hasMany(modelos.Operacion, { 
            foreignKey: 'Producto_FK',
            as: 'Operaciones' 
        });
        Producto.belongsTo(modelos.Animal, { 
            foreignKey: 'Animal_FK',
            as: 'Animales' 
        });
        Producto.belongsTo(modelos.Marca, { 
            foreignKey: 'Marca_FK',
            as: 'Marcas'
        });
        Producto.belongsTo(modelos.Categoria, { 
            foreignKey: 'Categoria_FK',
            as: 'Categorias'
        });
        Producto.belongsToMany(modelos.Local, {
            as: 'Locals',
            through: 'Local_producto',
            foreignKey: 'Producto_FK',
            otherKey: 'Local_FK'
        });
    }

    return Producto;
}

module.exports = producto;