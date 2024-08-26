/**
 * File: user.controller.ts
 * Author: moinuddin.ansari@vianaar.co.in & sonu.singh@vianaar.co.in
 * Date: 01-08-2024
 * Description: Controller for handling user-related requests and responses
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject } from 'fastify-decorators';
import { logger } from '../../common/services/logger.service';
import { BASE_ENDPOINT, STATUS_CODES, GETUSER_ENDPOINT, CARETAKER_ID_ENDPOINT } from '../../common/constants';
import { AuthController } from '../../common/controllers/auth.controller';
import { GetUserTypeSchema } from '../../schema/v1';
import { VcareUserService } from '../../services';
import { GetVcareUserRequest } from '../../types/v1/vcareuser/get';

@Controller({
  route: BASE_ENDPOINT + GETUSER_ENDPOINT + CARETAKER_ID_ENDPOINT,
})
export default class VcareUserController extends AuthController {
  @Inject(VcareUserService)
  private vcareuserService!: VcareUserService;

  /**
   * API to fetch user details for a given user ID
   * @param request
   * @param reply
   */
  @GET('', {
    schema: GetUserTypeSchema,
  })
  async getUserTypes(request: FastifyRequest<GetVcareUserRequest>, reply: FastifyReply) {
    const caretakerId = request.params.caretaker_id || 1040;

    logger.info(
      `VcareUserController -> getUserTypes :: Request to fetch user details for caretaker_id: ${caretakerId}`,
    );

    try {
      const userDetails = await this.vcareuserService.getUserTypes(caretakerId);
      console.log('Moin controller', userDetails);

      logger.info(
        `VcareUserController -> getUserTypes :: Successfully fetched user details for caretaker_id: ${caretakerId}`,
      );

      reply.status(STATUS_CODES.SUCCESS).send(userDetails);
    } catch (error) {
      logger.error(
        `VcareUserController -> getUserTypes :: Error fetching user details for user_id: ${caretakerId} - ${error}`,
      );

      //reply.status(STATUS_CODES.SUCCESS).send({ error: 'Failed to fetch user details' });
    }

    reply.status(STATUS_CODES.SUCCESS).send(await this.vcareuserService.getUserTypes(request.params.caretaker_id));
  }
}
