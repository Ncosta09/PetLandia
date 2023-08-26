function local_servicio(sequelize, Datatypes){

    let alias = 'Local_servicios';
    
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
        Local_Fk: {
            type: Datatypes.INTEGER
        }
    }
    
    let config = {
        camelcase: false,
        timestamps: false
    }
    
    const Local_servicio = sequelize.define(alias, cols, config);

    return Local_servicio;
}

module.exports = local_servicio;