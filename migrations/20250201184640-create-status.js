'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('statuses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      status: {
        type: Sequelize.ENUM("pending", "in_progress", "completed"),
        allowNull: false,
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
    await queryInterface.dropTable('statuses');
  }
};