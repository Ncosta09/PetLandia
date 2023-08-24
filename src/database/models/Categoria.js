function categoria(sequelize, Datatype){

    let alias = 'Categorias';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Nombre:{type: Datatype.string(30)},
        } 
    let config = {camelcase: false, timestamps:false}
    
    const Categoria = sequelize.define(alias, cols, config)
    return Categoria;
    }  
    module.exports = categoria;