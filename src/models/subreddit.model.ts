import { Database } from '.';
import { DataTypes as Sequelize } from 'sequelize';
import { PostModel } from './post.model';

interface ISubreddit {
  id: number;
  nome: string;
  subscribes: number;
}

export const SubredditModel = Database.define(
  'subreddit',
  {
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subscribes: {
      type: Sequelize.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { freezeTableName: true }
);

export async function createSubredditModel({ nome }: { nome: string }) {
  try {
    const ret = await SubredditModel.create({ nome: nome, subscribes: 0 });

    return ret;
  } catch (e) {
    return null;
  }
}

export async function getSubredditByIdModel(id: number) {
  return await SubredditModel.findByPk(id);
}
