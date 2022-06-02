"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("post", "userid", {
      type: Sequelize.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      allowNull: true,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("post", "userid");
  },
};
