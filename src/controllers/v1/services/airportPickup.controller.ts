/**
 * File: airportPickup.controller
 * Author: manoj.fulara@vectoscalar.com
 * Date: 24-05-2024
 * Description: Controller for handling airport pickup APIs
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, DELETE, Inject, POST, GET } from 'fastify-decorators';
import { logger } from '../../../common/services/logger.service';

import {
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
  BASE_ENDPOINT,
  STATUS_CODES,
  AIRPORT_PICKUP_ENDPOINT,
  REQUEST_ID_ENDPOINT,
} from '../../../common/constants/';
import { AuthController } from '../../../common/controllers/auth.controller';
import ProjectAndUnitMiddleWare from '../../../common/middlewares/projectAndUnit.middleware';
import {
  GetAirportPickupResponseSchema,
  AirportPickupDeleteSchema,
  AirportPickupRequestSchema,
} from '../../../schema/v1';
import { AirportPickupService } from '../../../services';
import { GetAirportRequest, CancelAirportRequest, CreateAirportPickupRequest } from '../../../types/v1';

@Controller({
  route:
    BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + AIRPORT_PICKUP_ENDPOINT,
})
export default class AirportPickupController extends AuthController {
  @Inject(AirportPickupService)
  private airportPickupService!: AirportPickupService;

  /*
   * API to create airport pickup request for given project ID and unit ID
   * @param request
   * @param reply
   */
  @POST('', {
    schema: AirportPickupRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async create(request: FastifyRequest<CreateAirportPickupRequest>, reply: FastifyReply) {
    logger.info(
      `AirportPickupController -> create :: Request to create airport pickup request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    const airportPickupRequest = await this.airportPickupService.createRequest(request);

    logger.info(
      `AirportPickupController -> create :: Successfully created airport pickup request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}. request id : ${airportPickupRequest.id}`,
    );

    reply.status(STATUS_CODES.CREATED).send(airportPickupRequest.id);
  }

  /**
   * API to cancel airport pickup request for given request_id
   * @param request
   * @param reply
   */
  @DELETE(REQUEST_ID_ENDPOINT, {
    schema: AirportPickupDeleteSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async cancel(request: FastifyRequest<CancelAirportRequest>, reply: FastifyReply) {
    logger.info(
      `AirportPickupController -> cancel :: Request to cancel airport pickup request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id} by user_id ${request.decodedToken?.app_user_id} `,
    );

    await this.airportPickupService.cancel(request);

    logger.info(
      `AirportPickupController -> cancelRequest :: Cancelled airport pickup request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id} and request_id : ${request.params.request_id}`,
    );

    reply.status(STATUS_CODES.NO_CONTENT);
  }

  /**
   * API to fetch airport pickup history for given project ID and unit ID
   * @param request
   * @param reply
   */
  @GET('', {
    schema: GetAirportPickupResponseSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async getAllRequest(request: FastifyRequest<GetAirportRequest>, reply: FastifyReply) {
    logger.info(
      `AirportPickupController -> getAllRequest :: Request to get all airport pickup request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );
    const airportRequests = await this.airportPickupService.getAirportRequests(request);
    logger.info(
      `AirportPickupController -> getAllRequest :: Successfully fetched all airport pickup request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(airportRequests);
  }
}
