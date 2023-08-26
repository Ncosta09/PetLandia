function local_producto(sequelize, Datatypes){

    let alias = 'Local_productos';

    let cols = {
        ID: {
            type: Datatypes.INTEGER,
            primarykey: true,
            autoincrement: true
        },

        //foreignKeys
        Local_Fk: {
            type: Datatypes.INTEGER
        },
        Producto_FK: {
            type: Datatypes.INTEGER
        }
    }

    let config = {
        camelcase: false,
        timestamps: false
    }
    
    const Local_producto = sequelize.define(alias, cols, config);

    return Local_producto;
}  

module.exports = local_producto;