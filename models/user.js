const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const Task = require("./task");
const Status = require("./status");

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
    tableName: "users",
  }
);

User.hasMany(Task, { foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
 })

 Task.belongsTo(User, { foreignKey: "userId" });

// User.hasMany(Status, { foreignKey: 'userId',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
//  })

// Product.hasOne(Store, { foreignKey: 'id',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
//  })

module.exports = User;
