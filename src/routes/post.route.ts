import express from 'express';
import {
  createPostController,
  getPostByIdController,
} from '../controllers/post.controller';

export function PostRoute(app: express.Application, baseUrl: string) {
  app.post(`${baseUrl}/create`, createPostController);
  app.get(`${baseUrl}/get/:id`, getPostByIdController);
}
