function operacionData(sequelize, Datatypes){

    let alias = 'Operaciones';

    let cols = {
        ID: {
            type: Datatypes.INTEGER,
            primarykey: true,
            autoincrement: true
        },
        Tipo_Operacion: {
            type: Datatypes.STRING(30)
        },
        Fecha: {
            type: Datatypes.DATE
        },

        //foreignKeys
        Servicio_FK: {
            type: Datatypes.INTEGER
        },
        Producto_FK: {
            type: Datatypes.INTEGER
        },
        Usuario_FK: {
            type: Datatypes.INTEGER
        }
    }

    let config = {
        camelcase: false,
        timestamps: false
    }
    
    const Operacion = sequelize.define(alias, cols, config);

    Operacion.associate = function(modelos){
        Operacion.belongsTo(modelos.Usuario, { 
            foreignKey: 'Usuario_FK',
            as: 'Usuarios' 
        });
        Operacion.belongsTo(modelos.Servicio, { 
            foreignKey: 'Servicio_FK',
            as: 'Servicios' 
        });
        Operacion.belongsTo(modelos.Producto, { 
            foreignKey: 'Producto_FK',
            as: 'Productos' 
        });
    }
    
    return Operacion;
}  

module.exports = operacionData;