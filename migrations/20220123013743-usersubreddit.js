'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('usersubreddit', {
      userid: {
        type: Sequelize.INTEGER,
        references: { key: 'id', model: 'user' },
        primaryKey: true,
      },
      subredditid: {
        type: Sequelize.INTEGER,
        references: { key: 'id', model: 'subreddit' },
        primaryKey: true,
      },
      favorite: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('usersubreddit');
  },
};
