import express from 'express';
import {
  createPostController,
  getPostByIdController,
  getPostBySubredditController,
} from '../controllers/post.controller';

export function PostRoute(app: express.Application, baseUrl: string) {
  app.post(`${baseUrl}/create`, createPostController);
  app.get(`${baseUrl}/get/:id`, getPostByIdController);
  app.get(
    `${baseUrl}/get/subreddit/:idSubreddit`,
    getPostBySubredditController
  );
}
