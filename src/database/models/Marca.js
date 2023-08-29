function Petlandia(sequelize, DataTypes){

    let alias = 'Marca';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey: true,
            autoincrement: true
        },
        Nombre: {
            type: DataTypes.STRING(30)
        }
    }

    let config = {
        camelcase: false,
        timestamps: false
    }
    
    const Marcas = sequelize.define(alias, cols, config);

    Marcas.associate = function(modelos){
        Marcas.hasMany(modelos.Producto, { 
            foreignKey: 'Marca_FK',
            as: 'Productos'
        });
    }

    return Marcas;
}
    
module.exports = Petlandia;