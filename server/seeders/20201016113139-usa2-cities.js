'use strict';
const usa2 = require('../data/usa2');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cities', usa2, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cities', null, {});
  }
};
