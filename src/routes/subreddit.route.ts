import express from 'express';
import {
  createSubreddit,
  getSubreddit,
} from '../controllers/subreddit.controller';

export function SubredditRoute(app: express.Application, baseUrl: string) {
  app.post(`${baseUrl}/create`, createSubreddit);
  app.get(`${baseUrl}/get/:id`, getSubreddit);
}
