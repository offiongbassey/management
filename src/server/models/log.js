'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Log.belongsTo(models.Guest, {
        foreignKey: 'guest_id',
        as: 'logs'
      })
    }
  }
  Log.init({
    staff_id: DataTypes.INTEGER,
    guest_id: DataTypes.INTEGER,
    description: { type: DataTypes.ENUM('created', 'edited', 'deleted'), defaultValue: 'created' },
    note: DataTypes.STRING,
    payload: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};