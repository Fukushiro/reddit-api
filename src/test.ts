import { Op } from 'sequelize/dist';
import { DataTypes as Sequelize } from 'sequelize/types';
import { Database } from './models';

const queryInterface = Database.getQueryInterface();
async function testeUp() {
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
}

async function testeDown() {
  queryInterface.dropTable('usersubreddit');
}
