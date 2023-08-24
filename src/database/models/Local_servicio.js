function local_servicio(sequelize, Datatype){

    let alias = 'Local_servicios';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Servicio_FK:{type: Datatype.integer},
        Local_Fk:{type: Datatype.integer},
        } 
    let config = {camelcase: false, timestamps:false}
    
    const Local_servicio = sequelize.define(alias, cols, config)
    return Local_servicio;
    }  
    module.exports = local_servicio;