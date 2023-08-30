function Petlandia (sequelize, DataTypes){

    let alias = 'Servicio_Animal';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey: true, 
            autoincrement: true
        },

        //foreignKeys
        Servicio_FK: {
            type: DataTypes.INTEGER
        },
        Animal_Fk: {
            type: DataTypes.INTEGER
        }
    } 
    
    let config = {
        tableName: 'Servicio_Animal',
        camelcase: false,
        timestamps:false
    }
    
    const Servicio_animales = sequelize.define(alias, cols, config);
    
    return Servicio_animales;
}  

module.exports = Petlandia;