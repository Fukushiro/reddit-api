import express from 'express';
import { checkNull } from '.';
import {
  createSubredditModel,
  getSubredditByIdModel,
} from '../models/subreddit.model';

export async function createSubreddit(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req?.body?.nome])) {
    return res
      .status(400)
      .json({ message: 'There are some missing parameters' });
  }

  const name = req.body.nome;
  const worked = await createSubredditModel({ nome: name });

  if (worked) {
    return res.status(200).json({ message: 'Success' });
  } else {
    return res.status(400).json({ message: 'Failure' });
  }
}

export async function getSubreddit(
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
  const subreddit: any = await getSubredditByIdModel(id);
  if (subreddit) {
    return res.status(200).json({
      message: 'Success',
      subreddit: {
        id: subreddit.id,
        nome: subreddit.nome,
        subscribes: subreddit.subscribes,
      },
    });
  } else {
    return res.status(400).json({ message: 'Failure', subreddit: null });
  }
}
