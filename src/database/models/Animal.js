function animalData(sequelize, Datatypes){

    let alias = 'Animales';

    let cols = {
        ID: {
            type: Datatypes.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        Nombre: {
            type: Datatypes.STRING(30)
        }
    }

    let config = {
        camelcase: false,
        timestamps: false
    }
    
    const Animal = sequelize.define(alias, cols, config);

    Animal.associate = function(modelos){
        Animal.hasMany(modelos.Producto, { 
            foreignKey: 'Animal_FK',
            as: 'Productos'
        });

        Animal.belongsToMany(modelos.Servicio, {
            as: 'Servicios',
            through: 'Servicio_animal',
            foreignKey: 'Animal_Fk',
            otherKey: 'Servicio_FK'
        });
    }

    return Animal;
}  

module.exports = animalData;