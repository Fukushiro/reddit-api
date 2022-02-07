import express from 'express';
import { avaliatePostController } from '../controllers/userupvotepost.controller';

export function UserUpvotePostRoute(app: express.Application, baseUrl: string) {
  app.put(`${baseUrl}/avaliate`, avaliatePostController);
}
