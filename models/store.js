const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize} = require ('../Database/sequelize');
const Product = require('./product');

class Store extends Model {}

Store.init(
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
       
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Store', // We need to choose the model name
    tableName: 'Store'
  },
);

//This lets the system know that the store has many products linked to it
Store.hasMany(Product, { foreignKey: 'storeId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
 })

Product.hasOne(Store, { foreignKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
 })
module.exports = Store