/**
 * File: plan.controller
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 12-06-2024
 * Description: Controller for Plan APIs
 */

import { Controller, GET, Inject } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BASE_ENDPOINT, STATUS_CODES } from '../../common/constants/common.constant';
import { PROJECT_ENDPOINT, PROJECT_ID_ENDPOINT, UNIT_ENDPOINT, UNIT_ID_ENDPOINT } from '../../common/constants';
import { PlanService } from '../../services';
import { GetPlanDetails } from '../../schema/v1';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { PLANS_ENDPOINT } from '../../common/constants/plan.constant';
import { AuthController } from '../../common/controllers/auth.controller';
import { GetPlanRequest } from '../../types/v1/plan/get';
import { logger } from '../../common/services/logger.service';

@Controller({
  route: BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + PLANS_ENDPOINT,
})
export default class PlanController extends AuthController {
  @Inject(PlanService)
  private planService!: PlanService;

  /**
   * API to fetch plan details for given project_id and unit id
   * @param request
   * @param reply
   */
  @GET('', {
    schema: GetPlanDetails,
    preHandler: [ProjectAndUnitMiddleWare.validateOngoingProjectAndUnit],
  })
  async getPlanDetails(request: FastifyRequest<GetPlanRequest>, reply: FastifyReply) {
    logger.info(
      `PlanController -> getPlanDetails :: Request to fetch plan and their images for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply
      .status(STATUS_CODES.SUCCESS)
      .send(await this.planService.getPlanDetails(request.params.project_id, request.params.unit_id));
  }
}
