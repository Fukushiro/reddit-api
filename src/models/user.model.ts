import { Database } from '.';
import { DataTypes as Sequelize } from 'sequelize';
import { encript } from '../services/user.service';
import { SubredditModel } from './subreddit.model';
const bcrypt = require('bcrypt');
export const UserModel = Database.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: { type: Sequelize.STRING(500), allowNull: false },
  },
  { freezeTableName: true }
);

export async function createUserModel({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const hashedPass = await encript(password);
    const ret = await UserModel.create({
      username: username,
      password: hashedPass,
    });

    return ret;
  } catch (e) {
    console.log('catch createUserModel', e);

    return null;
  }
}

export async function getUserByIdModel(id: number): Promise<any> {
  return await UserModel.findByPk(id, {
    include: [
      {
        model: SubredditModel,
        attributes: ['id', 'nome', 'subscribes'],
      },
    ],
  });
}

export async function autenticateUserModel(username: string, password: string) {
  const user: any = await UserModel.findOne({
    where: { username: username },
    include: [{ model: SubredditModel, attributes: ['nome', 'subscribes'] }],
    attributes: ['id', 'username', 'password'],
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }
  user.password = null;
  console.log('user', user);

  return user;
}
