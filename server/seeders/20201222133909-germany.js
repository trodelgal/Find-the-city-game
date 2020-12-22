'use strict';
const germany = require('../data/germany');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cities', germany, {});
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('Cities', null, {});
  }
};

