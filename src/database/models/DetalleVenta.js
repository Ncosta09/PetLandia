function Petlandia(sequelize, DataTypes){

    let alias = 'DetalleVenta';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        Precio_Unidad: {
            type: DataTypes.DECIMAL(10,2)
        },
        Cantidad: {
            type: DataTypes.INTEGER
        },
        Descuento: {
            type: DataTypes.DECIMAL(10,2)
        },
        Envio: {
            type: DataTypes.DECIMAL(10,2)
        },

        //foreignKeys
        Venta_FK: {
            type: DataTypes.INTEGER
        },
        Producto_FK: {
            type: DataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'DetalleVenta',
        camelcase: false,
        timestamps: false
    }
    
    const DetalleVentas = sequelize.define(alias, cols, config);

    DetalleVentas.associate = function(modelos){
        DetalleVentas.belongsTo(modelos.Producto, { 
            foreignKey: 'Producto_FK',
            as: 'Productos' 
        });

        DetalleVentas.belongsTo(modelos.Venta, { 
            foreignKey: 'Venta_FK',
            as: 'Ventas' 
        });
    }

    return DetalleVentas;
}  
    
module.exports = Petlandia;