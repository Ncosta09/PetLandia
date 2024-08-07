function Petlandia(sequelize, DataTypes){

    let alias = 'Producto';

    let cols = {
        ID: {
            type: DataTypes.INTEGER, 
            primarykey: true,
            autoincrement: true
        },
        Nombre: {
            type: DataTypes.STRING(30)
        },
        Descripcion: {
            type: DataTypes.STRING(100)
        },
        Imagen: {
            type: DataTypes.STRING(100)
        },
        Precio: {
            type: DataTypes.DECIMAL(10,2)
        },
        Stock: {
            type: DataTypes.INTEGER
        },
        Descuento: {
            type: DataTypes.INTEGER
        },
        // Envio: {
        //     type: DataTypes.DECIMAL(10,2)
        // },
        Fecha_Creacion: {
            type: DataTypes.DATE
        },
        Fecha_Modificacion: {
            type: DataTypes.DATE
        },
        Fecha_Eliminacion: {
            type:DataTypes.DATE
        },

        //foreignKeys
        Animal_FK: {
            type: DataTypes.INTEGER
        },
        Marca_FK: {
            type: DataTypes.INTEGER
        },  
        Categoria_FK: {
            type: DataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'Producto',
        camelcase: false,
        timestamps: false
    }
    
    const Productos = sequelize.define(alias, cols, config);

    Productos.associate = function(modelos){
        Productos.hasMany(modelos.DetalleVenta, { 
            foreignKey: 'Producto_FK',
            as: 'DetalleVentas' 
        });
        Productos.hasMany(modelos.Operacion, { 
            foreignKey: 'Producto_FK',
            as: 'Operaciones' 
        });
        Productos.belongsTo(modelos.Animal, { 
            foreignKey: 'Animal_FK',
            as: 'Animales' 
        });
        Productos.belongsTo(modelos.Marca, { 
            foreignKey: 'Marca_FK',
            as: 'Marcas'
        });
        Productos.belongsTo(modelos.Categoria, { 
            foreignKey: 'Categoria_FK',
            as: 'Categorias'
        });
        Productos.belongsToMany(modelos.Local, {
            as: 'Locales',
            through: 'Local_producto',
            foreignKey: 'Producto_FK',
            otherKey: 'Local_FK'
        });
    }

    return Productos;
}

module.exports = Petlandia;