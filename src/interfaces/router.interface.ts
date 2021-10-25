import { IRouter } from 'express';

export default interface BasicRouter {
  router: IRouter
  createRoutes(): void
}
