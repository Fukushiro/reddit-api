import { Op } from "sequelize/dist";
import { DataTypes as Sequelize } from "sequelize/types";
import { Database } from "./models";

const queryInterface = Database.getQueryInterface();
async function testeUp() {
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
}

async function testeDown() {
  queryInterface.removeColumn("subreddit", "about");
  queryInterface.removeColumn("subreddit", "title");
}
