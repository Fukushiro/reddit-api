import express from 'express';
import { checkNull } from '.';
import {
  createUserSubredditModel,
  userIsInSubredditModel,
} from '../models/usersubreddit.model';

export async function createUserSubredditController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.body.userid, req.body.subredditid])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const userid = req.body.userid;
  const subredditid = req.body.subredditid;

  const worked = await createUserSubredditModel({
    userid: userid,
    subredditid: subredditid,
  });
  if (worked) {
    return res.status(200).json({ message: 'Success' });
  } else {
    return res.status(400).json({ message: 'Failure' });
  }
}
export async function userIsInSubredditController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.params.userid, req.params.subredditid])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const userid = Number(req.params.userid);
  const subredditid = Number(req.params.subredditid);

  const ret = await userIsInSubredditModel({
    userid: userid,
    subredditid: subredditid,
  });
  console.log('--->', ret);

  if (ret) {
    return res
      .status(200)
      .json({ message: 'Success', userIsInSubreddit: ret.length > 0 });
  } else {
    return res.status(400).json({ message: 'Failure' });
  }
}
