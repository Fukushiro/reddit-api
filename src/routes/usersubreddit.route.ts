import express from 'express';
import {
  createUserSubredditController,
  removeUserFromSubredditController,
  userIsInSubredditController,
} from '../controllers/usersubreddit.controller';

export function UserSubredditRoute(app: express.Application, baseUrl: string) {
  app.post(`${baseUrl}/create`, createUserSubredditController);
  app.get(
    `${baseUrl}/isInSubreddit/userid/:userid/subredditid/:subredditid`,
    userIsInSubredditController
  );
  app.delete(
    `${baseUrl}/remove/userid/:userid/subredditid/:subredditid`,
    removeUserFromSubredditController
  );
}
