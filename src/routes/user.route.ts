import express from 'express';
import {
  createUserController,
  getUserByAuthController,
  getUserSubredditController,
} from '../controllers/user.controller';

export function UserRoute(app: express.Application, baseUrl: string) {
  app.post(`${baseUrl}/create`, createUserController);
  app.post(`${baseUrl}/auth`, getUserByAuthController);
  app.post(`${baseUrl}/get/subreddit`, getUserSubredditController);
}
