import { Database } from '.';
import { DataTypes as Sequelize } from 'sequelize';
import { SubredditModel } from './subreddit.model';
interface IPost {
  id: number;
  title: string;
  upvotes: number;
  downvotes: number;
}

const PostModel = Database.define(
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
    subredditid: {
      type: Sequelize.INTEGER,
      references: { key: 'id', model: 'subreddit' },
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
    },
  },
  { freezeTableName: true }
);

SubredditModel.hasMany(PostModel, { as: 'posts', foreignKey: 'subredditid' });
PostModel.belongsTo(SubredditModel, { foreignKey: 'subredditid' });

export async function createPostModel({
  title,
  subredditid,
  text,
}: {
  title: string;
  subredditid: number;
  text?: string;
}) {
  try {
    const ret = await PostModel.create({
      title: title,
      subredditid: subredditid,
      text: !!text ? text : null,
    });

    return ret;
  } catch (e) {
    return null;
  }
}

export async function getPostByIdModel(id: number) {
  return await PostModel.findByPk(id);
}

export async function getPostsBySubredditModel(idSubreddit: number) {
  return await PostModel.findAll({
    where: { subredditid: idSubreddit },
    attributes: ['id', 'title', 'upvotes', 'downvotes', 'createdAt', 'text'],
  });
}

export { PostModel };
