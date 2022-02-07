import express from 'express';
import { checkNull } from '.';
import { avaliateUserUpvotePostModel } from '../models/userupvotepost.model';
export async function avaliatePostController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.body.userid, req.body.postid, req.body.upvote])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const userid: number = Number(req.body.userid);
  const postid: number = Number(req.body.postid);
  const upvote: number = Number(req.body.upvote);
  const worked = await avaliateUserUpvotePostModel({
    postid: postid,
    upvote: upvote,
    userid: userid,
  });
  if (worked) {
    return res.status(200).json({ message: 'Success' });
  } else {
    return res.status(400).json({ message: 'Failure' });
  }
}
