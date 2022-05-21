import { Database } from '.';
import { DataTypes as Sequelize, Op } from 'sequelize';
import { PostModel } from './post.model';
import { UserModel } from './user.model';

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

// PostModel.belongsTo(SubredditModel, { foreignKey: 'subredditid' });

export async function createSubredditModel({ nome }: { nome: string }) {
  try {
    const ret = await SubredditModel.create({ nome: nome, subscribes: 0 });

    return ret;
  } catch (e) {
    return null;
  }
}

export async function getSubredditByIdModel(id: number) {
  return await SubredditModel.findByPk(id, {
    include: [
      {
        model: PostModel,
        as: 'posts',
        attributes: ['id', 'title', 'upvotes', 'downvotes'],
      },
    ],
  });
}

export async function getSubredditByNameLikeModel(name: string) {
  const query = `%${name}%`;
  return await SubredditModel.findAll({
    where: { nome: { [Op.like]: query } },
  });
}
