function Petlandia(sequelize, DataTypes){

    let alias = 'Local_Servicio';
    
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
        Local_Fk: {
            type: DataTypes.INTEGER
        }
    }
    
    let config = {
        tableName: 'Local_Servicio',
        camelcase: false,
        timestamps: false
    }
    
    const Local_servicios = sequelize.define(alias, cols, config);

    return Local_servicios;
}

module.exports = Petlandia;