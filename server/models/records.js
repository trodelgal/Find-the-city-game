'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Classes,{
        foreignKey:'classId'
      })
    }
  };
  Records.init({
    name: DataTypes.STRING,
    classId: DataTypes.INTEGER,
    country: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Records',
    paranoid: true,
    tableName: "Records",
  });
  return Records;
};