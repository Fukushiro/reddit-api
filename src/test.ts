import { Op } from 'sequelize/dist';
import { DataTypes as Sequelize } from 'sequelize/types';
import { Database } from './models';

const queryInterface = Database.getQueryInterface();
async function testeUp() {
  queryInterface.addColumn('post', 'subredditid', {
    type: Sequelize.INTEGER,
    references: { key: 'id', model: 'subreddit' },
  });
}

async function testeDown() {
  queryInterface.removeColumn('post', 'subredditid');
}
