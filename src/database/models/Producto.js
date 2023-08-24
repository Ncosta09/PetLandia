function producto(sequelize, Datatype){

    let alias = 'Productos';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Nombre:{type: Datatype.string(30)},
        Descripcion:{type: DataType.string(100)},
        Imagen:{type: DataType.string(50)},
        Precio:{type: Datatype.decimal(10,2)},
        Stock:{type: dataTypoe.integer},
        Fecha_Creacion:{type: DataType.date},
        Fecha_Modificacion:{type: Datatype.date},
        Fecha_Eliminacion: {type:DataType.date}, 
        Animal_FK:{type: DataType.integer},
        Marca_FK:{type: Datatype.integer},  
        Categoria_FK:{type: DataType.integer},
        }
    let config = {camelcase: false, timestamps:false}
    
    const Producto = sequelize.define(alias, cols, config)
    return Producto;
    }  
    module.exports = producto;
