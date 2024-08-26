/**
 * File: serviceRequest.controller
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 18-06-2024
 * Description: Controller for service request APIs
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, Inject, GET } from 'fastify-decorators';

import {
  BASE_ENDPOINT,
  STATUS_CODES,
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
  SERVICE_REQUEST,
} from '../../common/constants';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { ServiceRequestSchema } from '../../schema/v1';
import { ServiceRequestService } from '../../services';
import { GetAllServiceRequest } from '../../types/v1';
import { AuthController } from '../../common/controllers/auth.controller';
import { logger } from '../../common/services/logger.service';

@Controller({
  route: BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + SERVICE_REQUEST,
})
export default class ServiceRequestController extends AuthController {
  @Inject(ServiceRequestService)
  private serviceRequestService!: ServiceRequestService;

  /**
   * API to fetch all the service request details for a given project_id and unit_id
   * @param request
   * @param reply
   */
  @GET('', {
    schema: ServiceRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async getAll(request: FastifyRequest<GetAllServiceRequest>, reply: FastifyReply) {
    logger.info(
      `ServiceRequestController -> getAll :: Request to fetch all the service request details for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.serviceRequestService.getAll(request));
  }
}
