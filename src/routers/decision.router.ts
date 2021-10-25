import express, { IRouter } from 'express';
import BasicRouter from '../interfaces/router.interface';
import decisionHandler from '../handlers/decision/decision.get.handler';

export default class DecisionRouter implements BasicRouter {
  public router: IRouter = express.Router();

  constructor(private path: string) {
    this.createRoutes();
  }

  createRoutes() {
    this.router.get(this.path, decisionHandler);
  }
}
