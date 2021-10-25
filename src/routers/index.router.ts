import express, { IRouter } from 'express';
import BasicRouter from '../interfaces/router.interface';
import indexPageController from '../handlers/index/index.get.handler';

export default class IndexRouter implements BasicRouter {
  public router: IRouter = express.Router();

  constructor(private path: string) {
    this.createRoutes();
  }

  createRoutes() {
    this.router.get(this.path, indexPageController);
  }
}
