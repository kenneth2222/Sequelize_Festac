const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize} = require ('../Database/sequelize');

class Product extends Model {}

Product.init(
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
       
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false, 
    
    },
    ProductQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    ProductAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Store',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    
    
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Product', // We need to choose the model name
    tableName: 'Products'
  },
);

module.exports = Product