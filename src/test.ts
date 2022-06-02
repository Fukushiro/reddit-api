import { Op } from "sequelize/dist";
import { DataTypes as Sequelize } from "sequelize/types";
import { Database } from "./models";

const queryInterface = Database.getQueryInterface();
async function testeUp() {
  queryInterface.addColumn("post", "user", {
    type: Sequelize.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  });
}

async function testeDown() {
  queryInterface.removeColumn("post", "user");
}
