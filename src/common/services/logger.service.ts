/**
 * File: logger.service
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: Logger class file
 */

import { pino } from 'pino';
import { Service } from 'fastify-decorators';

@Service()
export class Logger {
  logger: any;

  constructor() {
    this.logger = pino({
      name: 'Vianaar',
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          ignore: 'pid,hostname,name',
        },
      },
    });
  }

  debug(...message: any) {
    this.logger.debug(message);
  }

  info(...message: any) {
    this.logger.info(message);
  }

  error(...error: any) {
    this.logger.error(error);
  }

  warn(...message: any) {
    this.logger.warn(message);
  }
}

export const logger = new Logger();
