import express from "express";
import { PostRoute } from "./post.route";
import { SubredditRoute } from "./subreddit.route";
import { UserRoute } from "./user.route";
import { UserSubredditRoute } from "./usersubreddit.route";
import { UserUpvotePostRoute } from "./userupvotepost.route";

export default (app: express.Application) => {
  SubredditRoute(app, "/subreddit");
  PostRoute(app, "/post");
  UserRoute(app, "/user");
  UserSubredditRoute(app, "/usersubreddit");
  UserUpvotePostRoute(app, "/userupvotepost");
};
