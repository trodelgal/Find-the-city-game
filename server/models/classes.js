'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Records, {
        foreignKey: 'classId'
      })
    }
  };
  Classes.init({
    school: DataTypes.STRING,
    class: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Classes',
    paranoid: true,
    tableName: "Classes",
  });
  return Classes;
};