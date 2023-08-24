function servicio(sequelize, Datatype){

    let alias = 'Servicios';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Nombre:{type: Datatype.string(30)},
        Descripcion:{type: DataType.string(100)},
        Precio:{type: Datatype.decimal(10,2)},
        Imagen:{type: DataType.string(50)}, 
        Fecha_Creacion:{type: DataType.date},
        Fecha_Modificacion:{type: Datatype.date},
        Fecha_Eliminacion: {type:DataType.date},    
    } 
    let config = {camelcase: false, timestamps:false}
    
    const Servicio_animal = sequelize.define(alias, cols, config)
    return Servicio_animal;
    }  
    module.exports = servicio;