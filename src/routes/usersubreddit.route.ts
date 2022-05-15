import express from 'express';
import {
  createUserSubredditController,
  userIsInSubredditController,
} from '../controllers/usersubreddit.controller';

export function UserSubredditRoute(app: express.Application, baseUrl: string) {
  app.post(`${baseUrl}/create`, createUserSubredditController);
  app.get(
    `${baseUrl}/isInSubreddit/userid/:userid/subredditid/:subredditid`,
    userIsInSubredditController
  );
}
