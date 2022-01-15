import express from 'express';
import { checkNull } from '.';
import { createPostModel, getPostByIdModel } from '../models/post.model';

export async function createPostController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.body.title])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }
  const title = req.body.title;

  const worked = await createPostModel({ title: title });
  if (worked) {
    return res.status(200).json({ message: 'Success' });
  } else {
    return res.status(400).json({ message: 'Failure' });
  }
}

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
