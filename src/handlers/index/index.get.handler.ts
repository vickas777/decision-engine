import { Request, Response } from 'express';

export default function indexGetHandler(req: Request, res: Response) {
  res.send({ greet: 'Welcome to home page' });
}
