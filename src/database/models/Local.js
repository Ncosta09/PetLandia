function Petlandia(sequelize, DataTypes){

    let alias = 'Local';
    
    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey: true, 
            autoincrement: true
        },
        Nombre: {
            type: DataTypes.STRING(30)
        },
        Telefono: {
            type: DataTypes.STRING(15)
        },
        Direccion: {
            type: DataTypes.STRING(30)
        },
        Imagen: {
            type: DataTypes.STRING(50)
        }, 
        Fecha_Creacion: {
            type: DataTypes.DATE
        },
        Fecha_Eliminacion: {
            type:DataTypes.DATE
        }
    }

    let config = {
        tableName: 'Local',
        camelcase: false,
        timestamps: false
    }

    const Locales = sequelize.define(alias, cols, config);

    Locales.associate = function(modelos){
        Locales.hasMany(modelos.Usuario, { 
            foreignKey: 'Local_FK',
            as: 'Usuarios' 
        });
        Locales.belongsToMany(modelos.Producto, {
            as: 'Productos',
            through: 'Local_producto',
            foreignKey: 'Local_FK',
            otherKey: 'Producto_FK'
        });
        Locales.belongsToMany(modelos.Servicio, {
            as: 'Servicios',
            through: 'Local_servicio',
            foreignKey: 'Local_FK',
            otherKey: 'Servicio_FK'
        });
    }

    return Locales;
}

module.exports = Petlandia;