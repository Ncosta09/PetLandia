function localData(sequelize, Datatypes){

    let alias = 'Locals';
    
    let cols = {
        ID: {
            type: Datatypes.INTEGER,
            primarykey: true, 
            autoincrement: true
        },
        Nombre: {
            type: Datatypes.STRING(30)
        },
        Telefono: {
            type: Datatypes.STRING(15)
        },
        Direccion: {
            type: Datatypes.STRING(30)
        },
        Imagen: {
            type: Datatypes.STRING(50)
        }, 
        Fecha_Creacion: {
            type: Datatypes.DATE
        },
        Fecha_Eliminacion: {
            type:Datatypes.DATE
        }
    }

    let config = {
        camelcase: false,
        timestamps: false
    }

    const Local = sequelize.define(alias, cols, config);

    Local.associate = function(modelos){
        Local.hasMany(modelos.Usuario, { 
            foreignKey: 'Local_FK',
            as: 'Usuarios' 
        });
        Local.belongsToMany(modelos.Producto, {
            as: 'Productos',
            through: 'Local_producto',
            foreignKey: 'Local_FK',
            otherKey: 'Producto_FK'
        });
        Local.belongsToMany(modelos.Servicio, {
            as: 'Servicios',
            through: 'Local_servicio',
            foreignKey: 'Local_FK',
            otherKey: 'Servicio_FK'
        });
    }

    return Local;
}

module.exports = localData;