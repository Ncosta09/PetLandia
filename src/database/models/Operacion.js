function Petlandia(sequelize, DataTypes){

    let alias = 'Operacion';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey: true,
            autoincrement: true
        },
        Tipo_Operacion: {
            type: DataTypes.STRING(30)
        },
        Fecha: {
            type: DataTypes.DATE
        },

        //foreignKeys
        Servicio_FK: {
            type: DataTypes.INTEGER
        },
        Producto_FK: {
            type: DataTypes.INTEGER
        },
        Usuario_FK: {
            type: DataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'Operacion',
        camelcase: false,
        timestamps: false
    }
    
    const Operaciones = sequelize.define(alias, cols, config);

    Operaciones.associate = function(modelos){
        Operaciones.belongsTo(modelos.Usuario, { 
            foreignKey: 'Usuario_FK',
            as: 'Usuarios' 
        });
        Operaciones.belongsTo(modelos.Servicio, { 
            foreignKey: 'Servicio_FK',
            as: 'Servicios' 
        });
        Operaciones.belongsTo(modelos.Producto, { 
            foreignKey: 'Producto_FK',
            as: 'Productos' 
        });
    }
    
    return Operaciones;
}  

module.exports = Petlandia;