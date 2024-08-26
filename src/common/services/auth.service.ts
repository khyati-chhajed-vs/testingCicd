/**
 * File: auth.service
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: Auth service file
 */

import { Service } from 'fastify-decorators';

import { BaseService } from '../services/base.service';
import { firebaseClient } from '../services/firebaseAuth.service';

import { UnAuthorisedError } from '../exceptions/errors';
import { logger } from '../services/logger.service';

import { ERROR_CODES } from '../constants/common.constant';

@Service()
export class AuthService extends BaseService {
  /**
   * method to validate route permissions
   * @param token
   * @returns
   */
  async validatePermission(token: string) {
    try {
      //geting auth token from uid

      const decodedToken = await firebaseClient.getDecodedFirebaseToken(token);

      logger.info(
        `AuthService -> validatePermission -> getDecodedFirebaseToken: decodedToken: ${JSON.stringify(decodedToken)}`,
      );

      return decodedToken;
    } catch (err: any) {
      throw new UnAuthorisedError(ERROR_CODES.UNAUTHORIZED, err.message);
    }
  }

  async isAuthorized(routerMethod: string, routerPath: string) {
    const currentRouteInfo = this.buildRouteInfoString(routerMethod, routerPath);
    logger.info('AuthService -> isAuthorized -> currentRouteInfo', currentRouteInfo);
  }

  private buildRouteInfoString(routerMethod: any, routerPath: any) {
    let action;
    if (routerMethod === 'GET') {
      action = 'get';
    } else if (routerMethod === 'POST') {
      action = 'add';
    } else if (routerMethod === 'PATCH' || routerMethod === 'PUT') {
      action = 'modify';
    } else if (routerMethod === 'DELETE') {
      action = 'delete';
    }

    return `${routerPath} (${action})`;
  }
}
