function animal(sequelize, Datatype){

    let alias = 'Animales';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Nombre:{type: Datatype.string(30)},
        } 
    let config = {camelcase: false, timestamps:false}
    
    const Animal = sequelize.define(alias, cols, config)
    return Animal;
    }  
    module.exports = animal;