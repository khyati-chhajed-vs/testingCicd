/**
 * File: survey.controller
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description: Controller for Survery APIs
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject, PATCH, POST } from 'fastify-decorators';

import {
  BASE_ENDPOINT,
  SURVEY_ENDPOINT,
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  STATUS_CODES,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
} from '../../common/constants';
import { AuthController } from '../../common/controllers/auth.controller';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { SurveyRequestSchema, getSurveySchema, SurveyPostponeSchema } from '../../schema/v1';
import { SurveyService } from '../../services';
import { SubmitSurveyRequest } from '../../types/v1';
import { GetSurveyRequest } from 'src/types/v1/survey/get';
import { SurveyPostponeRequest } from 'src/types/v1/survey/surveyPostpone';
import { logger } from '../../common/services/logger.service';

@Controller({
  route: BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + SURVEY_ENDPOINT,
})
export default class SurveryController extends AuthController {
  @Inject(SurveyService)
  private surveyService!: SurveyService;

  /*
   * API to submit survey data
   * @param request
   * @param reply
   */
  @POST('', {
    schema: SurveyRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async create(request: FastifyRequest<SubmitSurveyRequest>, reply: FastifyReply) {
    logger.info(
      `SurveryController -> create :: Request to submit survey for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    await this.surveyService.create(request);

    reply.status(STATUS_CODES.CREATED);
  }

  /*
   * API to fetch survey questions
   * @param request {GetSurveyRequest}
   * @param reply
   */

  @GET('', {
    schema: getSurveySchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async get(request: FastifyRequest<GetSurveyRequest>, reply: FastifyReply) {
    logger.info(
      `SurveryController -> get :: Request to fetch survey questions request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.surveyService.get(request));
  }

  /*
   * API for updating the count when a survey is skipped.
   * @param request {surveyPostponeRequest}
   * @param reply
   */

  @PATCH('', {
    schema: SurveyPostponeSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async updateSurveyLaterCount(request: FastifyRequest<SurveyPostponeRequest>, reply: FastifyReply) {
    logger.info(
      `SurveryController -> updateSurveyPostponeCount :: Request to update survey later count where  project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );
    await this.surveyService.updateSurveyLaterCount(request);
    reply.status(STATUS_CODES.NO_CONTENT).send();
  }
}
