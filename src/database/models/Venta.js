function ventaData(sequelize, Datatypes){

    let alias = 'Ventas';

    let cols = {
        ID: {
            type: Datatypes.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        Precio_unidad: {
            type: Datatypes.DECIMAL(10,2)
        },
        Cantidad: {
            type: Datatypes.INTEGER
        },
        Direccion:{
            type: Datatypes.STRING
        },
        Fecha: {
            type: Datatypes.DATE
        },

        //foreignKeys
        Usuario_FK: {
            type: Datatypes.INTEGER
        },
        Servicio_FK: {
            type: Datatypes.INTEGER
        },
        Producto_FK: {
            type: Datatypes.INTEGER
        },
        Medio_Pago_FK: {
            type: Datatypes.INTEGER
        }
    }

    let config = {
        camelcase: false,
        timestamps: false
    }
    
    const Venta = sequelize.define(alias, cols, config);

    Venta.associate = function(modelos){
        Venta.belongsTo(modelos.Usuario, { 
            foreignKey: 'Usuario_FK',
            as: 'Usuarios' 
        });

        Venta.belongsTo(modelos.Servicio, { 
            foreignKey: 'Servicio_FK',
            as: 'Servicios' 
        });

        Venta.belongsTo(modelos.Producto, { 
            foreignKey: 'Producto_FK',
            as: 'Productos' 
        });

        Venta.belongsTo(modelos.Medio_pago, { 
            foreignKey: 'Medio_Pago_FK',
            as: 'Medio_pagos' 
        });
    }

    return Venta;
}  
    
module.exports = ventaData;