/**
 * File: auth.controller
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: class for Authorization of API requests
 */

import { Hook, Inject } from 'fastify-decorators';
import { BaseController } from './base.controller';
import { FastifyRequest } from 'fastify';
import { logger } from '../services/logger.service';
import { AuthService } from '../services/auth.service';
import { BadTokenError, UnAuthorisedError } from '../exceptions/errors';
import { ERROR_CODES } from '../constants';

export abstract class AuthController extends BaseController {
  @Inject(AuthService)
  private authService!: AuthService;

  @Hook('onRequest')
  async validateAuth(request: FastifyRequest): Promise<void> {
    logger.info(request);

    const auth = request.headers?.authorization ?? request.headers?.Authorization;

    logger.info(`AuthController -> validateAuth: url: ${request.url} and headers authorization: ${auth}`);

    if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
      const token = auth.slice(7); // Remove 'Bearer ' from the beginning
      request.decodedToken = await this.authService.validatePermission(token);

      if (!request?.decodedToken) {
        logger.error(
          `Auth controller: decoded token not found in token for url: ${request.url}  decoded token: ${JSON.stringify(
            request.decodedToken,
          )} and auth: ${auth}`,
        );
        throw new UnAuthorisedError(ERROR_CODES.AUTH_FAILURE, 'Unauthorized error');
      }

      await this.authService.isAuthorized(request.routerMethod, request.routerPath);

      return;
    }

    throw new BadTokenError(ERROR_CODES.AUTH_FAILURE, 'Bad Token error');
  }
}
