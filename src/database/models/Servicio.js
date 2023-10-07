function Petlandia(sequelize, DataTypes){

    let alias = 'Servicio';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey: true, 
            autoincrement: true
        },
        Tipo_Servicio: {
            type: DataTypes.STRING(30)
        },
        Fecha_Turno: {
            type: DataTypes.DATE
        },
        Mensaje: {
            type: DataTypes.TEXT
        },

        //ForeignKeys
        Usuario_FK: {
            type: DataTypes.INTEGER
        }
    } 
    
    let config = {
        tableName: 'Servicio',
        camelcase: false,
        timestamps: false
    }
    
    const Servicios = sequelize.define(alias, cols, config);

    Servicios.associate = function(modelos){
        Servicios.hasMany(modelos.Venta, { 
            foreignKey: 'Servicio_FK',
            as: 'Ventas' 
        });
        Servicios.belongsToMany(modelos.Local, {
            as: 'Locales',
            through: 'Local_servicio',
            foreignKey: 'Servicio_FK',
            otherKey: 'Local_FK'
        });
        Servicios.hasMany(modelos.Operacion, { 
            foreignKey: 'Servicio_FK',
            as: 'Operaciones' 
        });
        Servicios.belongsToMany(modelos.Animal, {
            as: 'Animales',
            through: 'Servicio_animal',
            foreignKey: 'Servicio_FK',
            otherKey: 'Animal_Fk'
        });
        Servicios.belongsTo(modelos.Usuario, { 
            foreignKey: 'Usuario_FK',
            as: 'Usuarios'
        });
    }

    return Servicios;
}  

module.exports = Petlandia;