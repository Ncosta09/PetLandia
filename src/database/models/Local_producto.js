function Petlandia(sequelize, DataTypes){

    let alias = 'Local_Producto';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey: true,
            autoincrement: true
        },

        //foreignKeys
        Local_Fk: {
            type: DataTypes.INTEGER
        },
        Producto_FK: {
            type: DataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'Local_Producto',
        camelcase: false,
        timestamps: false
    }
    
    const Local_productos = sequelize.define(alias, cols, config);

    return Local_productos;
}  

module.exports = Petlandia;