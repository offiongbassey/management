'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Guests', 'status', { 
      type: Sequelize.ENUM('active', 'deleted', 'blocked'),
      defaultValue: 'active'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Guests', 'status');
  }
};
