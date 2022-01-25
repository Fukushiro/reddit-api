import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { configuration } from '../services/db.service';

config();
let Database: Sequelize = new Sequelize(configuration);

export { Database };
