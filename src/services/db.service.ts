import { Options } from 'sequelize/dist';

const dev: Options = {
  dialect: 'sqlite',
  storage: 'dev.sqlite3',
};

export const configuration: Options = dev;
