import { Op } from 'sequelize/dist';
import { DataTypes as Sequelize } from 'sequelize/types';
import { Database } from './models';

const queryInterface = Database.getQueryInterface();
async function testeUp() {
  queryInterface.createTable('user', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: { type: Sequelize.STRING(500), allowNull: false },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}

async function testeDown() {
  queryInterface.dropTable('user');
}
