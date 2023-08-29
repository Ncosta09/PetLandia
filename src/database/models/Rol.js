function Petlandia(sequelize, DataTypes){

    let alias = 'Rol';

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
    
    const Roles = sequelize.define(alias, cols, config);

    Roles.associate = function(modelos){
        Roles.hasMany(modelos.Usuario, { 
            foreignKey: 'Rol_FK',
            as: 'Usuarios'
        });
    }

    return Roles;
}  
    
module.exports = Petlandia;