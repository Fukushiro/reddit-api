import { Database } from '.';
import { DataTypes as Sequelize } from 'sequelize';
import { SubredditModel } from './subreddit.model';
interface IPost {
  id: number;
  title: string;
  upvotes: number;
  downvotes: number;
}

export const PostModel = Database.define(
  'post',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    upvotes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    downvotes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { freezeTableName: true }
);

PostModel.belongsTo(SubredditModel, { foreignKey: 'subredditid' });

export async function createPostModel({ title }: { title: string }) {
  try {
    const ret = await PostModel.create({ title: title });

    return ret;
  } catch (e) {
    return null;
  }
}

export async function getPostByIdModel(id: number) {
  return await PostModel.findByPk(id);
}

export async function getPostsBySubredditModel(idSubreddit: number) {
  return await PostModel.findAll({ where: { subredditid: idSubreddit } });
}
