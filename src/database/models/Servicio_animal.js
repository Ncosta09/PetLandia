function servicio_animal (sequelize, Datatype){

    let alias = 'Servicio_animals';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Servicio_FK:{type: Datatype.integer},
        Animal_Fk:{type: Datatype.integer},
        } 
    let config = {camelcase: false, timestamps:false}
    
    const Servicio_animal = sequelize.define(alias, cols, config)
    return Servicio_animal;
    }  
    module.exports = servicio_animal;