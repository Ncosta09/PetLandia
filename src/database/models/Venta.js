function Petlandia(sequelize, DataTypes){

    let alias = 'Venta';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        Precio_unidad: {
            type: DataTypes.DECIMAL(10,2)
        },
        Cantidad: {
            type: DataTypes.INTEGER
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
        Servicio_FK: {
            type: DataTypes.INTEGER
        },
        Producto_FK: {
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

        Ventas.belongsTo(modelos.Servicio, { 
            foreignKey: 'Servicio_FK',
            as: 'Servicios' 
        });

        Ventas.belongsTo(modelos.Producto, { 
            foreignKey: 'Producto_FK',
            as: 'Productos' 
        });

        Ventas.belongsTo(modelos.Medio_Pago, { 
            foreignKey: 'Medio_Pago_FK',
            as: 'Medios_pagos' 
        });
    }

    return Ventas;
}  
    
module.exports = Petlandia;