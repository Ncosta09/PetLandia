function Petlandia(sequelize, DataTypes){

    let alias = 'Animal';

    let cols = {
        ID: {
            type: DataTypes.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        Nombre: {
            type: DataTypes.STRING(30)
        }
    }

    let config = {
        tableName: 'Animal',
        camelcase: false,
        timestamps: false
    }
    
    const Animales = sequelize.define(alias, cols, config);

    Animales.associate = function(modelos){
        Animales.hasMany(modelos.Producto, { 
            foreignKey: 'Animal_FK',
            as: 'Productos'
        });

        Animales.belongsToMany(modelos.Servicio, {
            as: 'Servicios',
            through: 'Servicio_animal',
            foreignKey: 'Animal_Fk',
            otherKey: 'Servicio_FK'
        });
    }

    return Animales;
}  

module.exports = Petlandia;