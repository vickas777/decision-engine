import express, { Application } from 'express';
import { MiddleWaresRegistrator, RoutersRegistrator } from './registrators';

export default class ApplicationRunner {
  private application: Application;

  constructor(private port?: number | string) {
    this.application = express();
    this.port = port || process.env.PORT || 9090;
    this.applySettings();
    this.registerMiddleWares();
    this.registerRoutes();
  }

  applySettings() {
    this.application.set('port', this.port);
  }

  registerMiddleWares() {
    new MiddleWaresRegistrator(this.application).register();
  }

  registerRoutes() {
    new RoutersRegistrator(this.application).register();
  }

  async start() {
    await this.application.listen(this.port);
    console.log(`Server is listening at port ${this.port}`);
  }
}
