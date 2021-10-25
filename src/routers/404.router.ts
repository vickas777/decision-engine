import express, { IRouter } from 'express';
import BasicRouter from '../interfaces/router.interface';
import notFoundGetHandler from '../handlers/404/404.get.handler';

export default class RouteNotFoundRouter implements BasicRouter {
  public router: IRouter = express.Router();

  constructor(private path: string) {
    this.createRoutes();
  }

  createRoutes() {
    this.router.get(this.path, notFoundGetHandler);
    this.router.post(this.path, notFoundGetHandler);
  }
}
