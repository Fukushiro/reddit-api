import express from 'express';
import { checkNull } from '.';
import {
  autenticateUserModel,
  createUserModel,
  getUserByIdModel,
} from '../models/user.model';

export async function createUserController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.body.username, req.body.password])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const username = req.body.username;
  const password = req.body.password;

  const worked = await createUserModel({
    username: username,
    password: password,
  });
  if (worked) {
    return res.status(200).json({ message: 'Success' });
  } else {
    return res.status(400).json({ message: 'Failure' });
  }
}

export async function getUserByAuthController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.body.username, req.body.password])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const username: string = req.body.username;
  const password: string = req.body.password;
  console.log(username);

  const user: any = await autenticateUserModel(username, password);
  if (user) {
    return res.status(200).json({
      message: 'Success',
      user: user,
    });
  } else {
    return res.status(400).json({ message: 'Failure', user: null });
  }
}

export async function getUserSubredditController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.body.userid])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }

  const userid = req.body.userid;

  const user: { username: string; subreddits: Array<any> } =
    await getUserByIdModel(userid);

  if (user) {
    return res.status(200).json({
      message: 'Success',
      subreddits: user.subreddits,
    });
  } else {
    return res.status(400).json({ message: 'Failure', user: null });
  }
}
