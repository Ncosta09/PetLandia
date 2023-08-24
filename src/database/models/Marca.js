function marca(sequelize, Datatype){

    let alias = 'Marcas';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Nombre:{type: Datatype.string(30)},
        } 
    let config = {camelcase: false, timestamps:false}
    
    const Marca = sequelize.define(alias, cols, config)
    return Marca;
    }  
    module.exports = marca;