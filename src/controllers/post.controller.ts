import express from "express";
import { checkNull } from ".";
import {
  createPostModel,
  getPostByIdModel,
  getPostsBySubredditModel,
} from "../models/post.model";
import { getUserByIdModel } from "../models/user.model";

//controller to create a new post
export async function createPostController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!checkNull([req.body.title, req.body.subredditid, req.body.userid])) {
    return res
      .status(400)
      .json({ message: "There are some missing parameters" });
  }
  const title = req.body.title;
  const subredditid = req.body.subredditid;
  const text = !!req.body?.text ? req.body?.text : null;
  const userid: number = Number(req.body.userid);
  const worked = await createPostModel({
    title: title,
    subredditid: subredditid,
    text: text,
    userid: userid,
  });
  if (worked) {
    return res.status(200).json({ message: "Success" });
  } else {
    return res.status(400).json({ message: "Failure" });
  }
}

//controller to get a post by id
export async function getPostByIdController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    if (!checkNull([req.params.id])) {
      return res
        .status(400)
        .json({ message: "There are some missing parameters" });
    }
    const id: number = Number(req.params.id);
    const post: any = await getPostByIdModel(id);
    let user: any = null;
    if (post.userid != null) {
      user = await getUserByIdModel(post.userid);
      user.password = null;
    }

    if (post) {
      return res.status(200).json({
        message: "Success",
        // p: post,
        post: {
          id: post.id,
          title: post.title,
          upvotes: post.upvotes,
          downvotes: post.downvotes,
          user: !!user ? user : null,
        },
      });
    } else {
      return res.status(400).json({ message: "Failure", post: null });
    }
  } catch (e) {
    return res.status(400).json({ message: "Failure", post: null });
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
      .json({ message: "There are some missing parameters" });
  }
  const idSubreddit: number = Number(req.params.idSubreddit);
  const posts: any = await getPostsBySubredditModel(idSubreddit);
  const retorno = await Promise.all(
    posts.map(async (post: any) => {
      return {
        id: post.id,
        title: post.title,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
        text: post.text,
        createdAt: post.createdAt,
        user: !!post.userid ? await getUserByIdModel(post.userid) : null,
      };
    })
  );
  if (posts) {
    return res.status(200).json({
      message: "Success",
      posts: retorno,
    });
  } else {
    return res.status(400).json({ message: "Failure", post: null });
  }
}
