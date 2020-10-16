'use strict';
const contries = require('../data/contries');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Countries', contries, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Countries', null, {});
  }
};
