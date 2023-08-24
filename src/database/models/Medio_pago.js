function medio_pago(sequelize, Datatype){

    let alias = 'Medio_pagos';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Nombre:{type: Datatype.string(30)},
        } 
    let config = {camelcase: false, timestamps:false}
    
    const Medio_pago = sequelize.define(alias, cols, config)
    return Medio_pago;
    }  
    module.exports = medio_pago;