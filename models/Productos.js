const { Model, DataTypes} = require('sequelize');
const sequelize = require('../db/Connection');

class productos extends Model {}

productos.init({
    id_producto:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    imagen: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    categoria: DataTypes.STRING
},{
  sequelize, 
  modelName: 'productos' 
});




module.exports = {
  productos
};