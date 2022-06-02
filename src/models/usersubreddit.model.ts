import { Database } from ".";
import { DataTypes as Sequelize } from "sequelize";
import { UserModel } from "./user.model";
import { SubredditModel } from "./subreddit.model";

const UserSubredditModel = Database.define(
  "usersubreddit",
  {
    userid: {
      type: Sequelize.INTEGER,
      references: { key: "id", model: "user" },
      primaryKey: true,
    },
    subredditid: {
      type: Sequelize.INTEGER,
      references: { key: "id", model: "subreddit" },
      primaryKey: true,
    },
    favorite: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  { freezeTableName: true, timestamps: false }
);

UserModel.belongsToMany(SubredditModel, {
  through: "usersubreddit",
  foreignKey: "userid",
});
SubredditModel.belongsToMany(UserModel, {
  through: "usersubreddit",
  foreignKey: "subredditid",
});

// funções
export async function createUserSubredditModel({
  userid,
  subredditid,
}: {
  userid: number;
  subredditid: number;
}) {
  try {
    const ret = await UserSubredditModel.create({
      userid: userid,
      subredditid: subredditid,
    });

    return ret;
  } catch (e) {
    return null;
  }
}

export async function userIsInSubredditModel({
  userid,
  subredditid,
}: {
  userid: number;
  subredditid: number;
}) {
  try {
    const ret = await UserSubredditModel.findAll({
      where: { userid: userid, subredditid: subredditid },
    });

    return ret;
  } catch (e) {
    return null;
  }
}
export async function removeUserFromSubredditModel({
  userid,
  subredditid,
}: {
  userid: number;
  subredditid: number;
}) {
  try {
    const ret = await UserSubredditModel.destroy({
      where: { userid: userid, subredditid: subredditid },
    });

    return ret;
  } catch (e) {
    return null;
  }
}
