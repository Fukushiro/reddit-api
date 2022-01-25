import express from 'express';
import { createUserSubredditController } from '../controllers/usersubreddit.controller';

export function UserSubredditRoute(app: express.Application, baseUrl: string) {
  app.post(`${baseUrl}/create`, createUserSubredditController);
}
