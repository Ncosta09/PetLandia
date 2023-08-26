function medio_pago(sequelize, Datatypes){

    let alias = 'Medio_pagos';

    let cols = {
        ID: {
            type: Datatypes.INTEGER, 
            primarykey:true,
            autoincrement:true
        },
        Nombre: {
            type: Datatypes.STRING(30)
        }
    }

    let config = {
        camelcase: false, 
        timestamps: false
    }
    
    const Medio_pago = sequelize.define(alias, cols, config);

    Medio_pago.associate = function(modelos){
        Medio_pago.hasMany(modelos.Venta, { 
            foreignKey: 'Medio_Pago_FK',
            as: 'Ventas'
        });
    }
    
    return Medio_pago;
}  
    
module.exports = medio_pago;