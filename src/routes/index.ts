import express from 'express';
import { PostRoute } from './post.route';
import { SubredditRoute } from './subreddit.route';
import { UserRoute } from './user.route';

export default (app: express.Application) => {
  SubredditRoute(app, '/subreddit');
  PostRoute(app, '/post');
  UserRoute(app, '/user');
};
