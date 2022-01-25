import express from 'express';
import { checkNull } from '.';
import { createUserSubredditModel } from '../models/usersubreddit.model';

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
