// eslint-disable-next-line max-classes-per-file
import { Application } from 'express';
import * as bodyParser from 'body-parser';

import { DevLoggerProvider, ProductionLoggerProvider } from './loggerProvider';

import Registrator from './interfaces/registerator.interface';

import IndexRouter from './routers/index.router';
import RouteNotFoundRouter from './routers/404.router';
import DecisionRouter from './routers/decision.router';

export class MiddleWaresRegistrator implements Registrator {
  constructor(private app: Application) {
  }

  register() {
    this.getMiddleWareList().forEach((middleware) => this.app.use(middleware));
  }

  private getMiddleWareList() {
    return [
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      (process.env.NODE_ENV === 'dev' ? new DevLoggerProvider() : new ProductionLoggerProvider()).getLogger(),
    ];
  }
}

export class RoutersRegistrator implements Registrator {
  constructor(private app: Application) { }

  register() {
    this.getRouterList().forEach(({ router }) => this.app.use(router));
  }

  private getRouterList() {
    return [
      new IndexRouter('/'),
      new DecisionRouter('/decision'),
      new RouteNotFoundRouter('*'),
    ];
  }
}
