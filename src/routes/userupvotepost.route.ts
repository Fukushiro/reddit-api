import express from 'express';
import {
  avaliatePostController,
  getUserUpvotePostAvaliationController,
  getUserUpvotePostController,
  getUserUpvotePostSumController,
} from '../controllers/userupvotepost.controller';

export function UserUpvotePostRoute(app: express.Application, baseUrl: string) {
  app.put(`${baseUrl}/avaliate`, avaliatePostController);
  app.get(`${baseUrl}/get/post/:postid`, getUserUpvotePostController);
  app.get(
    `${baseUrl}/get/sum/upvote/post/:postid`,
    getUserUpvotePostSumController
  );
  app.get(
    `${baseUrl}/get/avaliation/user/:userid/post/:postid`,
    getUserUpvotePostAvaliationController
  );
}
