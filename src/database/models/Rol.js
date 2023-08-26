function rolData(sequelize, Datatypes){

    let alias = 'Rols';

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
    
    const Rol = sequelize.define(alias, cols, config);

    Rol.associate = function(modelos){
        Rol.hasMany(modelos.Usuario, { 
            foreignKey: 'Rol_FK',
            as: 'Usuarios'
        });
    }

    return Rol;
}  
    
module.exports = rolData;