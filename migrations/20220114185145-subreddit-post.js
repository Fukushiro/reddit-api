'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('post', 'subredditid', {
      type: Sequelize.INTEGER,
      references: { key: 'id', model: 'subreddit' },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('post', 'subredditid');
  },
};
