'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {

    static associate(models) {
      this.belongsTo(models.Countries,{
        foreignKey:'countryId'
      })
    }
  };
  Cities.init({
    countryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    hebrewName: DataTypes.STRING,
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cities',
    paranoid: true,
    tableName: "Cities",
  });
  return Cities;
};