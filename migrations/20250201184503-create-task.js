'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
       userId: {
            type: Sequelize.UUID,
            allowNull: false,
            // references: {
            //   model: "user",
            //   key: "id",
            // },
            // onUpdate: "CASCADE",
            // onDelete: "CASCADE",
          },
          
          statusId: {
              type: Sequelize.UUID,
              allowNull: false,
              // references: {
              //   model: "status",
              //   key: "id",
              // },
              // onUpdate: "CASCADE",
              // onDelete: "CASCADE",
            },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};