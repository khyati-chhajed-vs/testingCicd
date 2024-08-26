/**
 * File: survey.service
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description: This service class is responsible for handling business logic operations
 *              related to survey
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';

import { SurveyQuestionDAO } from '../dao/';
import { SubmitSurveyRequest, GetSurveyRequest, SurveyPostponeRequest } from '../types/v1';
import { SurveySubmittingAnswerService } from './surveySubmittingAnswer.service';
import { SurveySubmittingService } from './surveySubmitting.service';
import { SURVEY_ERROR, SURVEY_STATUS } from '../common/constants';
import { BadRequestError, NotFoundError } from '../common/exceptions/errors';
import { logger } from '../common/services/logger.service';
import { ProjectService } from './project.service';

@Service()
export class SurveyService extends BaseService {
  @Inject(SurveyQuestionDAO)
  private surveyQuestionDAO!: SurveyQuestionDAO;

  @Inject(SurveySubmittingAnswerService)
  private surveySubmittingAnswerService!: SurveySubmittingAnswerService;

  @Inject(SurveySubmittingService)
  private surveySubmittingService!: SurveySubmittingService;

  @Inject(ProjectService)
  private projectService!: ProjectService;

  /**
   * Method to submit survey details for a project_id and unit_id
   * @param request
   * @returns
   */
  async create(request: FastifyRequest<SubmitSurveyRequest>) {
    const surveyQuestionIdMap = await this.validateSurveyRequest(request);

    const transaction = await this.surveyQuestionDAO.getTransaction();
    try {
      const surveyData: any = await this.surveySubmittingService.create(request, transaction);
      logger.info(`SurveyService -> create :: survey user data created with submitting_id ${surveyData?.id} `);
      await this.surveySubmittingAnswerService.bulkCreateSurveyAnswer(
        request,
        surveyQuestionIdMap,
        surveyData?.id,
        transaction,
      );

      await this.projectService.updateProject(
        request.params.project_id,
        { survey_status: SURVEY_STATUS.COMPLETED },
        transaction,
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(
        `SurveyService -> create :: Request failed to submit survey data  for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
      );

      throw error;
    }
  }

  /**
   * Method to validate the survey request
   * @param request
   * @param surveyQuestionIdMap
   */
  private async validateSurveyRequest(request: FastifyRequest<SubmitSurveyRequest>) {
    const { body } = request;
    const project_status = request.data?.unitAndProject?.[0]?.project_status,
      survey_status = request.data?.unitAndProject?.[0]?.survey_status;

    if (survey_status != SURVEY_STATUS.ENABLE) {
      logger.error(
        `SurveyService->create:: survey feature not enabled for this project for project_id ${request.params.project_id}`,
      );
      throw new BadRequestError(SURVEY_ERROR.SURVEY_NOT_ENABLED.CODE);
    }

    const surveyQuestion = await this.surveyQuestionDAO.findQuestionByProjectStatus(project_status);

    if (!surveyQuestion?.length) {
      logger.error(`SurveyService->create:: survey question not found for project_status ${project_status}`);
      throw new NotFoundError(SURVEY_ERROR.QUES_NOT_FOUND.CODE);
    }

    const surveyQuestionIdMap = new Map<number, any>();
    surveyQuestion.forEach((question) => {
      surveyQuestionIdMap.set(question.question_id, question);
    });

    body?.survey_data?.forEach((reqSurveyQuestion) => {
      const questionData = surveyQuestionIdMap.get(Number(reqSurveyQuestion.question_id));
      if (!questionData || questionData.category != reqSurveyQuestion.category) {
        logger.error(`SurveyService -> create :: bad request question category mismatch`);
        throw new BadRequestError(SURVEY_ERROR.QUES_CATEGORY_MISMATCH.CODE);
      }
    });

    return surveyQuestionIdMap;
  }

  /**
   * Method to get the survey questions
   * @param request
   * @returns object[]
   */

  async get(request: FastifyRequest<GetSurveyRequest>) {
    try {
      const project_status = request.data?.unitAndProject?.[0]?.project_status,
        is_survey_enabled = request.data?.unitAndProject[0]?.survey_status;
      if (is_survey_enabled != SURVEY_STATUS.ENABLE) {
        logger.error(
          `SurveyService -> get:: survey feature not enabled for this project for project_id ${request.params.project_id}`,
        );
        throw new BadRequestError(SURVEY_ERROR.SURVEY_NOT_ENABLED.CODE);
      }
      const [questionData, [description]] = await Promise.all([
        this.surveyQuestionDAO.findQuestionByProjectStatus(project_status),
        this.surveyQuestionDAO.findFeedbackIntro(project_status),
      ]);

      if (!questionData?.length) {
        throw new NotFoundError(SURVEY_ERROR.QUES_NOT_FOUND.CODE);
      }
      return { description: description.title, question_data: questionData };
    } catch (error: any) {
      logger.error(
        `SiteVisitRequestService -> get : Failed to get questions for project_id :${request.params.project_id} unit_id :${request.params.unit_id} error: ${error}`,
      );

      throw error;
    }
  }

  /**
   * Method for updating the count when a survey is skipped
   * @param request {SurveyPostponeRequest}
   */

  async updateSurveyLaterCount(request: FastifyRequest<SurveyPostponeRequest>) {
    try {
      const survey_status = request.data?.unitAndProject?.[0]?.survey_status;
      if (survey_status != SURVEY_STATUS.ENABLE) {
        logger.error(
          `SurveyService -> updateSurveyLaterCount :: survey feature not enabled for this project for project_id ${request.params.project_id} and unit_id ${request.params.unit_id}`,
        );
        throw new BadRequestError(SURVEY_ERROR.SURVEY_NOT_ENABLED.CODE);
      }
      await this.projectService.updateUserProject(request.params.project_id, request.params.unit_id, {
        survey_postpone_count: request.data?.unitAndProject?.[0]?.survey_postpone_count + 1,
      });
    } catch (error: any) {
      logger.error(
        `SurveyService -> updateSurveyLaterCount : Failed to update count for survey_postpone_count for :${request.params.project_id} unit_id :${request.params.unit_id} error: ${error}`,
      );

      throw error;
    }
  }
}
