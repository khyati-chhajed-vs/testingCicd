/**
 * File: laundry.controller
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 24-05-2024
 * Description:  Controller for Laundry APIs
 */
import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, DELETE, GET, Inject, POST } from 'fastify-decorators';
import { logger } from '../../../common/services/logger.service';

import {
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
  BASE_ENDPOINT,
  LAUNDRY_ENDPOINT,
  STATUS_CODES,
  REQUEST_ID_ENDPOINT,
} from '../../../common/constants';
import { AuthController } from '../../../common/controllers/auth.controller';
import ProjectAndUnitMiddleWare from '../../../common/middlewares/projectAndUnit.middleware';
import { DeleteRequestSchema, GetLaundryResponseSchema, LaundryPickupRequestSchema } from '../../../schema/v1';
import { LaundryService } from '../../../services';
import { GetLaundryRequest, LaundryDeleteRequest, LaundryPickupRequest } from '../../../types/v1';

@Controller({
  route: BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + LAUNDRY_ENDPOINT,
})
export default class LaundryController extends AuthController {
  @Inject(LaundryService)
  private laundryService!: LaundryService;

  /**
   * API to create laundry pickup request for
   * given project ID and unit ID
   * @param request
   * @param reply
   */
  @POST('', {
    schema: LaundryPickupRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async create(request: FastifyRequest<LaundryPickupRequest>, reply: FastifyReply) {
    logger.info(
      `LaundryController -> createRequest :: Request to create laundry request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    const laundryRequest = await this.laundryService.create(request);

    logger.info(
      `LaundryController -> createRequest :: Created laundry pickup request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}. Created request id : ${laundryRequest.id}`,
    );

    reply.status(STATUS_CODES.CREATED).send(laundryRequest.id);
  }

  /**
   * API to delete laundry pickup request for given project ID and unit ID
   * @param request
   * @param reply
   */
  @DELETE(REQUEST_ID_ENDPOINT, {
    schema: DeleteRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async delete(request: FastifyRequest<LaundryDeleteRequest>, reply: FastifyReply) {
    logger.info(
      `LaundryController -> deleteRequest :: Request to delete laundry request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id} and request_id : ${request.params.request_id}`,
    );

    await this.laundryService.delete(request);

    logger.info(
      `LaundryController -> deleteRequest : Deleted laundry request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id} and request id : ${request.params.request_id}`,
    );

    reply.status(STATUS_CODES.NO_CONTENT);
  }

  /**
   * API to fetch laundry pickup history for given project ID and unit ID
   * @param request
   * @param reply
   */
  @GET('', {
    schema: GetLaundryResponseSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async getAllRequest(request: FastifyRequest<GetLaundryRequest>, reply: FastifyReply) {
    logger.info(
      `LaundryController -> getAllRequest :: Request to get all laundry request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );
    const laundryRequests = await this.laundryService.getLaundryHistory(request);
    logger.info(
      `LaundryController -> getAllRequest :: Successfully fetched all laundry request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(laundryRequests);
  }
}
