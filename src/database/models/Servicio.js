function Petlandia(sequelize, DataTypes){

    let alias = 'Servicio';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey: true, 
            autoincrement: true
        },
        Nombre: {
            type: DataTypes.STRING(30)
        },
        Descripcion: {
            type: DataTypes.STRING(100)
        },
        Precio: {
            type: DataTypes.DECIMAL(10,2)
        },
        Descuento: {
            type: DataTypes.INTEGER
        },
        Imagen: {
            type: DataTypes.STRING(100)
        }, 
        Fecha_Creacion: {
            type: DataTypes.DATE
        },
        Fecha_Modificacion: {
            type: DataTypes.DATE
        },
        Fecha_Eliminacion: {
            type:DataTypes.DATE
        }
    } 
    
    let config = {
        tableName: 'Servicio',
        camelcase: false,
        timestamps: false
    }
    
    const Servicios = sequelize.define(alias, cols, config);

    Servicios.associate = function(modelos){
        Servicios.hasMany(modelos.Venta, { 
            foreignKey: 'Servicio_FK',
            as: 'Ventas' 
        });
        Servicios.belongsToMany(modelos.Local, {
            as: 'Locales',
            through: 'Local_servicio',
            foreignKey: 'Servicio_FK',
            otherKey: 'Local_FK'
        });
        Servicios.hasMany(modelos.Operacion, { 
            foreignKey: 'Servicio_FK',
            as: 'Operaciones' 
        });
        Servicios.belongsToMany(modelos.Animal, {
            as: 'Animales',
            through: 'Servicio_animal',
            foreignKey: 'Servicio_FK',
            otherKey: 'Animal_Fk'
        });
    }

    return Servicios;
}  

module.exports = Petlandia;