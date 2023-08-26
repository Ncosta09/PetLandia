function categoriaData(sequelize, Datatypes){

    let alias = 'Categorias';

    let cols = {
        ID: {
            type: Datatypes.INTEGER, 
            primarykey: true,
            autoincrement: true
        },
        Nombre: {
            type: Datatypes.STRING(30)
        }
    }

    let config = {
        camelcase: false,
        timestamps: false
    }
    
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(modelos){
        Categoria.hasMany(modelos.Producto, { 
            foreignKey: 'Categoria_FK',
            as: 'Productos'
        });
    }

    return Categoria;
}

module.exports = categoriaData;