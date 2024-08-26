/**
 * File: login.service
 * Author: AKSHIKA CHOUDHARY
 * Date: 25-07-2024
 * Description: Service to handle logic of user Login
 */

import { FastifyRequest } from 'fastify';
import { Inject, Service } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';
import { loginRequest } from '../types/v1';
import { loginWithEmail } from '../common/services/loginWithEmail';
import { firebaseClient } from '../common/services/firebaseAuth.service';
import { BadRequestError } from '../common/exceptions/errors';
import { logger } from '../common/services/logger.service';
import { INVALID_LOGIN_CREDENTIALS, LOGIN_ERROR, TOO_MANY_ATTEMPTS_TRY_LATER } from '../common/constants';
import { UserService } from './user.service';
@Service()
export class LoginService extends BaseService {
  @Inject(UserService)
  private userService!: UserService;

  /**
   * Method to user login.
   * @param body <loginRequest>
   * @returns
   */
  async login(request: FastifyRequest<loginRequest>) {
    const { password, ...newObject } = request.body;
    await this.userService.getUserDetailsByParams(newObject);

    let user_email = request.body?.user_email;

    try {
      if (request.body.hasOwnProperty('user_mobile')) {
        user_email = (await firebaseClient.getUserByPhoneNumber(request.body.user_mobile)).email || '';
      }

      const loginToken = await loginWithEmail(user_email, password);

      const { localId } = loginToken?.data;

      const token = await firebaseClient.createCustomToken(localId);

      return token;
    } catch (error: any) {
      logger.error(`LoginService -> login -> error while sign in user. Error ${error?.response.data.error.message}`);
      if (error.response.data.error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
        throw new BadRequestError(TOO_MANY_ATTEMPTS_TRY_LATER.CODE);
      } else if (error.response.data.error.message.includes('INVALID_LOGIN_CREDENTIALS')) {
        throw new BadRequestError(INVALID_LOGIN_CREDENTIALS.CODE);
      } else {
        throw new BadRequestError(LOGIN_ERROR.CODE);
      }
    }
  }
}
