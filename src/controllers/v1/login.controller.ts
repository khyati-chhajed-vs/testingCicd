/**
 * File: login.controller
 * Author: AKSHIKA CHOUDHARY
 * Date: 25-07-2024
 * Description: Controller for API requests handling login-related tasks
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, POST, Inject } from 'fastify-decorators';

import { BASE_ENDPOINT, LOGIN, STATUS_CODES } from '../../common/constants';
import { logger } from '../../common/services/logger.service';
import { loginRequest } from '../../types/v1';
import { BaseController } from '../../common/controllers/base.controller';
import { LoginSchema } from '../../schema/v1';
import { LoginService } from '../../services/login.service';

@Controller({
  route: BASE_ENDPOINT + LOGIN,
})
export default class LoginController extends BaseController {
  @Inject(LoginService)
  private loginService!: LoginService;

  /**
   * API to login
   * @param request
   * @param reply
   */
  @POST('', {
    schema: LoginSchema,
  })
  async login(request: FastifyRequest<loginRequest>, reply: FastifyReply) {
    logger.info(`LoginController -> login :: Request to login with userID : ${JSON.stringify(request.body)} `);

    reply.status(STATUS_CODES.SUCCESS).send(await this.loginService.login(request));
  }
}
