function Petlandia(sequelize, DataTypes){

    let alias = 'Medio_Pago';

    let cols = {
        ID: {
            type: DataTypes.INTEGER, 
            primarykey:true,
            autoincrement:true
        },
        Nombre: {
            type: DataTypes.STRING(30)
        }
    }

    let config = {
        camelcase: false, 
        timestamps: false
    }
    
    const Medios_pagos = sequelize.define(alias, cols, config);

    Medios_pagos.associate = function(modelos){
        Medios_pagos.hasMany(modelos.Venta, { 
            foreignKey: 'Medio_Pago_FK',
            as: 'Ventas'
        });
    }
    
    return Medios_pagos;
}  
    
module.exports = Petlandia;