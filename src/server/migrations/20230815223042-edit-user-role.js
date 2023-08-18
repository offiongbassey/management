'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'role');

   await queryInterface.addColumn('Users', 'role_id', {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
   });

   await queryInterface.addConstraint('Users', {
    fields: ['role_id'],
    type: 'foreign key',
    name: 'user-role-association',
      references: {
        table: 'Roles',
        field: 'id'
      }
   });

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('admin', 'user'),
      defaultValue: 'user'
     });

   await queryInterface.removeColumn('Users', 'role_id');

   await queryInterface.removeConstraint('Users', {
    fields: ['role_id'],
    type: 'foreign key',
    name: 'user-role-association',
      references: {
        table: 'Roles',
        field: 'id'
      }
   });
  }
};
