function venta(sequelize, Datatype){

    let alias = 'Ventas';
    let cols = {
        ID:{type: Datatype.integer, primarykey:true, autoincrement:true},
        Precio_unidad:{type: Datatype.decimal(10,2)},
        Cantidad:{type: Datatype.integer},
        Direccion:{type: DataType.string},
        Fecha:{type: DataType.date},
        Usuario_FK:{type: DataType.integer},
        Servicio_FK: {type: DataType.integer},
        Producto_FK: {type: DataType.integer},
        Medio_Pago_FK: {type: DataType.integer},
        }
    let config = {camelcase: false, timestamps:false}
    
    const Venta = sequelize.define(alias, cols, config)
    return Venta;
    }  
    
    module.exports = venta;