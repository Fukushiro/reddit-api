import express from "express";
import { checkNull } from ".";
import {
  createSubredditModel,
  getSubredditByIdModel,
  getSubredditByNameLikeModel,
} from "../models/subreddit.model";

export async function createSubreddit(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req?.body?.nome, req?.body?.title, req?.body?.about])) {
    return res
      .status(400)
      .json({ message: "There are some missing parameters" });
  }

  const name: string = req.body.nome;
  const title: string = req.body.title;
  const about: string = req.body.about;
  console.log(title, about);

  const worked = await createSubredditModel({
    nome: name,
    title: title,
    about: about,
  });
  console.log(worked);

  if (worked) {
    return res.status(200).json({ message: "Success" });
  } else {
    return res.status(400).json({ message: "Failure" });
  }
}

export async function getSubreddit(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    console.log("req param id", req.params.id);

    if (!checkNull([req.params.id])) {
      return res
        .status(400)
        .json({ message: "There are some missing parameters" });
    }
    const id: number = Number(req.params.id);
    const subreddit: any = await getSubredditByIdModel(id);
    console.log("subreddit", subreddit);

    if (subreddit) {
      return res.status(200).json({
        message: "Success",
        subreddit: subreddit,
      });
    } else {
      return res.status(400).json({ message: "Failure", subreddit: null });
    }
  } catch (e) {
    return res.status(400).json({ message: "Failure", subreddit: null });
  }
}

export async function getSubredditByNameLikeController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.params.name])) {
    return res
      .status(400)
      .json({ message: "There are some missing parameters" });
  }
  // getSubredditByNameLike;
  const name = req.params.name;

  const subreddit: any = await getSubredditByNameLikeModel(name);
  if (subreddit) {
    return res.status(200).json({
      message: "Success",
      subreddit: subreddit,
    });
  } else {
    return res.status(400).json({ message: "Failure", subreddit: null });
  }
}
