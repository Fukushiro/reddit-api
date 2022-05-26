"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("subreddit", "about", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    });
    queryInterface.addColumn("subreddit", "title", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("subreddit", "about");
    queryInterface.removeColumn("subreddit", "title");
  },
};
