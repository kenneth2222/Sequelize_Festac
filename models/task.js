const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/sequelize");

class Task extends Model {}

Task.init(
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    
    statusId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "status",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Task", // We need to choose the model name
    tableName: "tasks",
  }
);

module.exports = Task;
