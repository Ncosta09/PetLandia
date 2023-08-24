function local(sequelize, Datatype){

let alias = 'Locals';
let cols = {
    ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
    Nombre:{type: Datatype.string(30)},
    Telefono:{type: Datatype.string(15)},
    Direccion:{type: DataType.string(30)},
    Imagen:{type: DataType.string(50)}, 
    Fecha_Creacion:{type: DataType.date},
    Fecha_Eliminacion: {type:DataType.date}, 
    } 
let config = {camelcase: false, timestamps:false}

const Local = sequelize.define(alias, cols, config)
return Local;
}  
module.exports = local;