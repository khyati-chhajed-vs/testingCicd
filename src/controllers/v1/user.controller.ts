/**
 * File: user.controller
 * Author: manoj.fulara@vectoscalar.com
 * Date: 24-05-2024
 * Description: Controller for handling user-related request ,response
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject, POST, PATCH } from 'fastify-decorators';
import { CreateUserRequestSchema, GetUserDetailsSchema, UpdateUserSchema } from '../../schema/v1';
import { UserService } from '../../services';
import { logger } from '../../common/services/logger.service';
import { CreateUserRequest } from 'src/types/v1';
import { BASE_ENDPOINT, STATUS_CODES, USER_ENDPOINT } from '../../common/constants';
import { AuthController } from '../../common/controllers/auth.controller';
import { UserUpdateRequest } from 'src/types/v1';

@Controller({
  route: BASE_ENDPOINT + USER_ENDPOINT,
})
export default class UserController extends AuthController {
  @Inject(UserService)
  private userService!: UserService;

  /**
   * API to fetch user details for give user ID
   * @param request
   * @param reply
   */
  @GET('', {
    schema: GetUserDetailsSchema,
  })
  async getUserDetails(request: FastifyRequest, reply: FastifyReply) {
    logger.info(
      `UserController -> getUserDetails :: Request to fetch user details for user_id :  ${request?.decodedToken?.vianaar_uid}`,
    );

    const userDetails = await this.userService.getUserDetails(request.decodedToken?.vianaar_uid);

    logger.info(
      `UserController -> getUserDetails :: Successfully fetched user details for user_id :  ${request?.decodedToken?.vianaar_uid}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(userDetails);
  }

  /**
   * API to create user with email and phone numner coming from ERP.
   * @param request
   * @param reply
   */

  @POST('', { schema: CreateUserRequestSchema })
  async create(request: FastifyRequest<CreateUserRequest>, reply: FastifyReply) {
    logger.info(`UserController -> create :: Request to create user ${request}`);

    const user = await this.userService.createUser(request.body);

    reply.status(STATUS_CODES.SUCCESS).send(user);
  }

  /*
   * API to update user
   * @param request
   * @param reply
   */
  @PATCH('', {
    schema: UpdateUserSchema,
  })
  async updateUser(request: FastifyRequest<UserUpdateRequest>, reply: FastifyReply) {
    logger.info(
      `UserController -> updateUserDetails :: Request to update user details for user_id :  ${request?.decodedToken?.vianaar_uid}`,
    );

    const userDetails = await this.userService.updateUserDetails(request.decodedToken?.vianaar_uid, request);

    logger.info(
      `UserController -> updateUserDetails :: User details successfully updated for user_id :  ${request?.decodedToken?.vianaar_uid}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(userDetails);
  }
}
