'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Guest.hasMany(models.Log, {
        foreignKey: 'guest_id',
        as: 'logs'
      })
      
    }
  }
  Guest.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    status: { type: DataTypes.ENUM('active', 'deleted', 'blocked'), defaultValue: 'active' },
  }, {
    sequelize,
    modelName: 'Guest',
  });
  return Guest;
};