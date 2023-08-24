function rol(sequelize, Datatype){

    let alias = 'Rols';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Nombre:{type: Datatype.string(30)},
        } 
    let config = {camelcase: false, timestamps:false}
    
    const Rol = sequelize.define(alias, cols, config)
    return Rol;
    }  
    module.exports = rol;