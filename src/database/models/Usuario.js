function usuarioData(sequelize, Datatypes){

    let alias = 'Usuarios';

    let cols = {
        ID: {
            type: Datatypes.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        Nombre: {
            type: Datatypes.STRING(30)
        },
        Email: {
            type: Datatypes.STRING(30)
        },
        Password: {
            type: Datatypes.STRING(100)
        },
        Telefono: {
            type: Datatypes.STRING(15)
        },
        Imagen: {
            type: Datatypes.STRING(50)
        },
        Fecha_Creacion: {
            type: Datatypes.DATE
        },
        Fecha_Eliminacion: {
            type:Datatypes.DATE
        },

        //ForeignKeys
        Rol_FK: {
            type: Datatypes.integer
        },
        Local_FK: {
            type: Datatypes.integer
        }
    } 

    let config = {
        camelcase: false,
        timestamps: false
    }
    
    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(modelos){
        Usuario.belongsTo(modelos.Local, { 
            foreignKey: 'Local_FK',
            as: 'Locals' 
        });

        Usuario.belongsTo(modelos.Rol, { 
            foreignKey: 'Rol_FK',
            as: 'Rols'
        });

        Usuario.hasMany(modelos.Venta, { 
            foreignKey: 'Usuario_FK',
            as: 'Ventas' 
        });

        Usuario.hasMany(modelos.Operacion, { 
            foreignKey: 'Usuario_FK',
            as: 'Operaciones' 
        });
    }

    return Usuario;
}

module.exports = usuarioData;

  
    
	
    
	
