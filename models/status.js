const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const Task = require("./task");

class Status extends Model {}

Status.init(
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"),
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
      }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Status", // We need to choose the model name
    tableName: "statuses",
  }
);

Status.hasMany(Task, { foreignKey: 'statusId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
 })

 Task.belongsTo(Status, { foreignKey: "statusId" });

module.exports = Status;
