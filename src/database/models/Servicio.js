function servicioData(sequelize, Datatypes){

    let alias = 'Servicios';

    let cols = {
        ID: {
            type: Datatypes.integer,
            primarykey: true, 
            autoincrement: true
        },
        Nombre: {
            type: Datatypes.string(30)
        },
        Descripcion: {
            type: Datatypes.string(100)
        },
        Precio: {
            type: Datatypes.decimal(10,2)
        },
        Imagen: {
            type: Datatypes.string(50)
        }, 
        Fecha_Creacion: {
            type: Datatypes.date
        },
        Fecha_Modificacion: {
            type: Datatypes.date
        },
        Fecha_Eliminacion: {
            type:Datatypes.date
        }
    } 
    
    let config = {
        camelcase: false,
        timestamps: false
    }
    
    const Servicio = sequelize.define(alias, cols, config);

    Servicio.associate = function(modelos){
        Servicio.hasMany(modelos.Venta, { 
            foreignKey: 'Servicio_FK',
            as: 'Ventas' 
        });
        Servicio.belongsToMany(modelos.Local, {
            as: 'Locals',
            through: 'Local_servicio',
            foreignKey: 'Servicio_FK',
            otherKey: 'Local_FK'
        });
        Servicio.hasMany(modelos.Operacion, { 
            foreignKey: 'Servicio_FK',
            as: 'Operaciones' 
        });
        Servicio.belongsToMany(modelos.Animal, {
            as: 'Animales',
            through: 'Servicio_animal',
            foreignKey: 'Servicio_FK',
            otherKey: 'Animal_Fk'
        });
    }

    return Servicio;
}  

module.exports = servicioData;