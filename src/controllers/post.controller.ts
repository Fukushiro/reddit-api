import express from 'express';
import { checkNull } from '.';
import {
  createPostModel,
  getPostByIdModel,
  getPostsBySubredditModel,
} from '../models/post.model';

//controller to create a new post
export async function createPostController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.body.title, req.body.subredditid])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const title = req.body.title;
  const subredditid = req.body.subredditid;

  const worked = await createPostModel({
    title: title,
    subredditid: subredditid,
  });
  if (worked) {
    return res.status(200).json({ message: 'Success' });
  } else {
    return res.status(400).json({ message: 'Failure' });
  }
}

//controller to get a post by id
export async function getPostByIdController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.params.id])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const id: number = Number(req.params.id);
  const post: any = await getPostByIdModel(id);
  if (post) {
    return res.status(200).json({
      message: 'Success',
      p: post,
      post: {
        id: post.id,
        title: post.title,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
      },
    });
  } else {
    return res.status(400).json({ message: 'Failure', post: null });
  }
}

// controller to get multiple posts with a subreddit id
export async function getPostBySubredditController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.params.idSubreddit])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const idSubreddit: number = Number(req.params.idSubreddit);
  const posts: any = await getPostsBySubredditModel(idSubreddit);
  if (posts) {
    return res.status(200).json({
      message: 'Success',
      posts: posts,
    });
  } else {
    return res.status(400).json({ message: 'Failure', post: null });
  }
}
