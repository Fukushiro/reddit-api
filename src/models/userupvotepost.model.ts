import { Database } from '.';
import { DataTypes as Sequelize } from 'sequelize';
import { UserModel } from './user.model';
import { SubredditModel } from './subreddit.model';

const UserUpvotePost = Database.define(
  'userupvotepost',
  {
    userid: {
      type: Sequelize.INTEGER,
      references: { key: 'id', model: 'user' },
      primaryKey: true,
    },
    postid: {
      type: Sequelize.INTEGER,
      references: { key: 'id', model: 'post' },
      primaryKey: true,
    },
    upvote: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

// funções
export async function createUserUpvotePostModel({
  userid,
  postid,
  upvote,
}: {
  userid: number;
  postid: number;
  upvote?: number;
}) {
  try {
    const ret = await UserUpvotePost.create({
      userid: userid,
      postid: postid,
      upvote: !!upvote ? upvote : 0,
    });

    return ret;
  } catch (e) {
    return null;
  }
}

export async function avaliateUserUpvotePostModel({
  userid,
  postid,
  upvote,
}: {
  upvote: number;
  userid: number;
  postid: number;
}) {
  //check if column exists
  const userUpvotePost = await UserUpvotePost.findOne({
    where: { userid: userid, postid: postid },
  });
  //create upvote column if not exists
  if (!userUpvotePost) {
    return await createUserUpvotePostModel({
      postid: postid,
      userid: userid,
      upvote: upvote,
    });
  }
  //update column to new value
  return await UserUpvotePost.update(
    { upvote: upvote },
    { where: { userid: userid, postid: postid } }
  );
}
