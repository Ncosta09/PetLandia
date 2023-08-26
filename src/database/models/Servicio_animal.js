function servicio_animal (sequelize, Datatypes){

    let alias = 'Servicio_animals';

    let cols = {
        ID: {
            type: Datatypes.INTEGER,
            primarykey: true, 
            autoincrement: true
        },

        //foreignKeys
        Servicio_FK: {
            type: Datatypes.INTEGER
        },
        Animal_Fk: {
            type: Datatypes.INTEGER
        }
    } 
    
    let config = {
        camelcase: false,
        timestamps:false
    }
    
    const Servicio_animal = sequelize.define(alias, cols, config);
    
    return Servicio_animal;
}  

module.exports = servicio_animal;