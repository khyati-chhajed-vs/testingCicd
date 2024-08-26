/**
 * File: feedback.controller
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 11-06-2024
 * Description: Controller for feedback APIs
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject, POST } from 'fastify-decorators';
import { logger } from '../../common/services/logger.service';

import {
  BASE_ENDPOINT,
  STATUS_CODES,
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
  FEEDBACK_ENDPOINT,
} from '../../common/constants';
import { GetFeedbackResponseSchema, SubmitFeedbackSchema } from '../../schema/v1';
import { FeedbackService } from '../../services';
import { GetFeedbackRequest, SubmitFeedbackRequest } from '../../types/v1';
import { AuthController } from '../../common/controllers/auth.controller';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';

@Controller({
  route: BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + FEEDBACK_ENDPOINT,
})
export default class FeedbackController extends AuthController {
  @Inject(FeedbackService)
  private feedbackService!: FeedbackService;

  /**
   * API to submit feedback for given project ID and unit ID
   * @param request
   * @param reply
   */
  @POST('', {
    schema: SubmitFeedbackSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async create(request: FastifyRequest<SubmitFeedbackRequest>, reply: FastifyReply) {
    logger.info(
      `FeedbackController -> create :: Request to submit feedback for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    const feedback: any = await this.feedbackService.create(request);

    logger.info(
      `FeedbackController -> create :: Successfully submitted feedback for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}.`,
    );

    reply.status(STATUS_CODES.CREATED).send(feedback.id);
  }

  /**
   * API to get feedback for given project ID and unit ID
   * @param request
   * @param reply
   */

  @GET('', {
    schema: GetFeedbackResponseSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async get(request: FastifyRequest<GetFeedbackRequest>, reply: FastifyReply) {
    logger.info(
      `FeedbackController -> get :: Request to get feedback for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.feedbackService.get(request));
  }
}
