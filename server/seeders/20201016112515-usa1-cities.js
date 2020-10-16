'use strict';
const usa1 = require('../data/usa1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cities', usa1, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cities', null, {});
  }
};
