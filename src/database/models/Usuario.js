function Petlandia(sequelize, DataTypes){

    let alias = 'Usuario';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        Nombre: {
            type: DataTypes.STRING(30)
        },
        Apellido: {
            type: DataTypes.STRING(30)
        },
        Email: {
            type: DataTypes.STRING(30)
        },
        Password: {
            type: DataTypes.STRING(100)
        },
        Telefono: {
            type: DataTypes.STRING(15)
        },
        Imagen: {
            type: DataTypes.STRING(100)
        },
        Fecha_Creacion: {
            type: DataTypes.DATE
        },
        Fecha_Eliminacion: {
            type:DataTypes.DATE
        },

        //ForeignKeys
        Rol_FK: {
            type: DataTypes.INTEGER
        },
        Local_FK: {
            type: DataTypes.INTEGER
        }
    } 

    let config = {
        tableName: 'Usuario',
        camelcase: false,
        timestamps: false
    }
    
    const Usuarios = sequelize.define(alias, cols, config);

    Usuarios.associate = function(modelos){
        Usuarios.belongsTo(modelos.Local, { 
            foreignKey: 'Local_FK',
            as: 'Locales' 
        });

        Usuarios.belongsTo(modelos.Rol, { 
            foreignKey: 'Rol_FK',
            as: 'Roles'
        });

        Usuarios.hasMany(modelos.Venta, { 
            foreignKey: 'Usuario_FK',
            as: 'Ventas' 
        });

        Usuarios.hasMany(modelos.Operacion, { 
            foreignKey: 'Usuario_FK',
            as: 'Operaciones' 
        });
    }

    return Usuarios;
}

module.exports = Petlandia;

  
    
	
    
	
