'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Guests', 'staff_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await  queryInterface.addConstraint('Guests', {
    fields: ['staff_id'],
    type: 'foreign key',
    name: 'user_guest_association',
    references: {
      table: 'Users',
      field: 'id'
    }
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Guests', 'staff_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.removeConstraint('Guests', {
      fields: ['staff_id'],
      type: 'foreign key',
      name: 'user_guest_association',
      references: {
        table: 'Users',
        field: 'id'
      }
     })
  }
};