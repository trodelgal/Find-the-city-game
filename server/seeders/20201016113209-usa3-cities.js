'use strict';
const usa3 = require('../data/usa3');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cities', usa3, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cities', null, {});
  }
};
