function local_producto(sequelize, Datatype){

    let alias = 'Local_productos';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Nombre:{type: Datatype.string(30)},
        } 
    let config = {camelcase: false, timestamps:false}
    
    const Local_producto = sequelize.define(alias, cols, config)
    return Local_producto;
    }  
    module.exports = local_producto;