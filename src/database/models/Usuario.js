function usuario(sequelize, Datatype){

    let alias = 'Usuarios';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Nombre:{type: Datatype.string(30)},
        Email:{type: DataType.string(30)},
        Password:{type: DataType.string(100)},
        Telefono:{type: dataType.string(15)},
        Imagen:{type: DataType.string(50)}, 
        Fecha_Creacion:{type: DataType.date},
        Fecha_Eliminacion: {type:DataType.date}, 
        Rol_FK:{type: DataType.integer},
        Local_FK:{type: dataType.integer},        
    } 
    let config = {camelcase: false, timestamps:false}
    
    const Usuario = sequelize.define(alias, cols, config)
    return Usuario;
    }  
    module.exports = usuario;

  
    
	
    
	
