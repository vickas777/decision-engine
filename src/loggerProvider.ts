import morgan from 'morgan';
import LoggerProvider from './interfaces/loggerProvider.interface';

export class DevLoggerProvider implements LoggerProvider {
  private logger: any;

  constructor() {
    this.logger = morgan('dev');
  }

  getLogger() {
    return this.logger;
  }
}

export class ProductionLoggerProvider implements LoggerProvider {
  private logger: any;

  constructor() {
    this.logger = morgan('combined');
  }

  getLogger() {
    return this.logger;
  }
}
