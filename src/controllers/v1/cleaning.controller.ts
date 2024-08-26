/**
 * File: cleaning.controller
 * Author: manoj.fulara@vectoscalar.com
 * Date: 21-05-2024
 * Description: Controller for all cleaning apis
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject } from 'fastify-decorators';

import { CLEANING_ENDPOINT, MIS_ENDPOINT } from '../../common/constants/cleaning.constant';
import { BASE_ENDPOINT, STATUS_CODES } from '../../common/constants/common.constant';
import {
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
} from '../../common/constants/project.constant';
import { AuthController } from '../../common/controllers/auth.controller';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { GetCleaningResponseSchema, GetMISSummaryResponseSchema } from '../../schema/v1';
import { CleaningService } from '../../services';
import { CleaningDetailsRequest, GetMISSummaryRequest } from '../../types/v1';
import { logger } from '../../common/services/logger.service';

@Controller({
  route: BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + CLEANING_ENDPOINT,
})
export default class CleaningController extends AuthController {
  @Inject(CleaningService)
  private cleaningService!: CleaningService;

  /**
   * API to fetch cleaning data for given project ID and unit ID
   * @param request
   * @param reply
   */
  @GET('', {
    schema: GetCleaningResponseSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async getCleaningDetails(request: FastifyRequest<CleaningDetailsRequest>, reply: FastifyReply) {
    logger.info(
      `CleaningController -> getCleaningDetails :: Request to fetch cleaning data  for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id} `,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.cleaningService.getCleaningDetails(request));
  }

  @GET(MIS_ENDPOINT, {
    schema: GetMISSummaryResponseSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async getMISSummary(request: FastifyRequest<GetMISSummaryRequest>, reply: FastifyReply) {
    logger.info(
      `CleaningController -> getMISSummary :: Request to fetch last month mis summary  for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id} `,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.cleaningService.getMISSummary(request));
  }
}
