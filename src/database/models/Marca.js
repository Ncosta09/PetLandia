function marcaData(sequelize, Datatypes){

    let alias = 'Marcas';

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
    
    const Marca = sequelize.define(alias, cols, config);

    Marca.associate = function(modelos){
        Marca.hasMany(modelos.Producto, { 
            foreignKey: 'Marca_FK',
            as: 'Productos'
        });
    }

    return Marca;
}
    
module.exports = marcaData;