function Petlandia(sequelize, DataTypes){

    let alias = 'Venta';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        Precio_Total: {
            type: DataTypes.DECIMAL(10,2)
        },
        Cantidad_Total: {
            type: DataTypes.INTEGER
        },
        Costo_Envio: {
            type: DataTypes.DECIMAL(10,2)
        },
        Direccion:{
            type: DataTypes.STRING
        },
        Fecha: {
            type: DataTypes.DATE
        },

        //foreignKeys
        Usuario_FK: {
            type: DataTypes.INTEGER
        },
        Medio_Pago_FK: {
            type: DataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'Venta',
        camelcase: false,
        timestamps: false
    }
    
    const Ventas = sequelize.define(alias, cols, config);

    Ventas.associate = function(modelos){
        Ventas.belongsTo(modelos.Usuario, { 
            foreignKey: 'Usuario_FK',
            as: 'Usuarios' 
        });

        Ventas.belongsTo(modelos.Medio_Pago, { 
            foreignKey: 'Medio_Pago_FK',
            as: 'Medios_pagos' 
        });

        Ventas.hasMany(modelos.DetalleVenta, { 
            foreignKey: 'Venta_FK',
            as: 'DetalleVentas' 
        });
    }

    return Ventas;
}  
    
module.exports = Petlandia;