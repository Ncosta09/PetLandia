function Petlandia(sequelize, DataTypes){

    let alias = 'Categoria';

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
    
    const Categorias = sequelize.define(alias, cols, config);

    Categorias.associate = function(modelos){
        Categorias.hasMany(modelos.Producto, { 
            foreignKey: 'Categoria_FK',
            as: 'Productos'
        });
    }

    return Categorias;
}

module.exports = Petlandia;