'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('userupvotepost', {
      userid: {
        type: Sequelize.INTEGER,
        references: { key: 'id', model: 'user' },
        primaryKey: true,
      },
      postid: {
        type: Sequelize.INTEGER,
        references: { key: 'id', model: 'post' },
        primaryKey: true,
      },
      upvote: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('userupvotepost');
  },
};
