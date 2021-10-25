import { Request, Response } from 'express';

export default function notFoundGetHandler(req: Request, res: Response) {
  res.status(404).send({ error: 'Check you url address' });
}
