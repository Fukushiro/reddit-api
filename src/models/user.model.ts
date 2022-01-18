import { Database } from '.';
import { DataTypes as Sequelize } from 'sequelize';
import { encript } from '../services/user.service';
const bcrypt = require('bcrypt');
const UserModel = Database.define(
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

export async function getUserByIdModel(id: number) {
  return await UserModel.findByPk(id);
}

export async function autenticateUserModel(username: string, password: string) {
  const user: any = await UserModel.findOne({ where: { username: username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
  };
}
