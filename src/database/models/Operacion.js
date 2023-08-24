function operacion(sequelize, Datatype){

    let alias = 'Operacions';
    let cols = {
    ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
    Tipo_Operacion:{type: Datatype.string(30)},
    Fecha: {type: DataType.date},
	Servicio_FK:{type: dataType.integer},
    Producto_FK:{type: dataType.integer},
    Usuario_FK:{type: dataType.integer},
    }
    let config = {camelcase: false, timestamps:false}
    
    const Operacion = sequelize.define(alias, cols, config)
    return Operacion;
    }  
    module.exports = operacion;
