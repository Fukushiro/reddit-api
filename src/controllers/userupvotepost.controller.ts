import express from 'express';
import { checkNull } from '.';
import {
  avaliateUserUpvotePostModel,
  getUserUpvotePostAllModel,
  getUserUpvotePostAvaliationModel,
  getUserUpvotePostUpvoteSumModel,
  IUserUpvotePost,
} from '../models/userupvotepost.model';
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

export async function getUserUpvotePostController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.params.postid])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }

  const postid: number = Number(req.params.postid);

  const userUpvotePost: Array<IUserUpvotePost> =
    await getUserUpvotePostAllModel({
      postid: postid,
    });
  if (userUpvotePost) {
    return res.status(200).json({
      message: 'Success',
      userUpvotePost: userUpvotePost,
    });
  } else {
    return res.status(400).json({ message: 'Failure', userUpvotePost: null });
  }
}
//get sum of upvotes
export async function getUserUpvotePostSumController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.params.postid])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const postid: number = Number(req.params.postid);

  const userUpvotePost = await getUserUpvotePostUpvoteSumModel({
    postid: postid,
  });
  if (userUpvotePost) {
    return res.status(200).json({
      message: 'Success',
      userUpvotePost: userUpvotePost,
    });
  } else {
    return res.status(400).json({ message: 'Failure', userUpvotePost: null });
  }
}

export async function getUserUpvotePostAvaliationController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.params.postid, req.params.userid])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const postid: number = Number(req.params.postid);
  const userid: number = Number(req.params.userid);

  const userUpvotePost = await getUserUpvotePostAvaliationModel({
    postid: postid,
    userid: userid,
  });
  if (userUpvotePost) {
    return res.status(200).json({
      message: 'Success',
      userUpvotePost: userUpvotePost,
    });
  } else {
    return res.status(400).json({ message: 'Failure', userUpvotePost: null });
  }
}
