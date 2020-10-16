'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {

    static associate(models) {
      this.hasMany(models.Cities, {
        foreignKey: 'countryId'
      })
    }
  };
  Countries.init({
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    zoom: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Countries',
  });
  return Countries;
};