/**
 * File: surveySubmittingAnswer.service
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description:This service class is responsible for handling business logic operations
 *              related to submitting survey answers
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';

import { SurveySubmittingAnswerDAO } from '../dao/';
import { SubmitSurveyRequest } from '../types/v1';
import { Transaction } from 'sequelize';

@Service()
export class SurveySubmittingAnswerService extends BaseService {
  @Inject(SurveySubmittingAnswerDAO)
  private surveySubmittingAnswerDAO!: SurveySubmittingAnswerDAO;

  /**
   * Method to submit survey answers data for survey submitting_id
   * @param request
   * @param surveyQuestionIdMap
   * @param surveySubmittingId
   * @param transaction
   * @returns
   */
  async bulkCreateSurveyAnswer(
    request: FastifyRequest<SubmitSurveyRequest>,
    surveyQuestionIdMap: Map<number, any>,
    surveySubmittingId: number,
    transaction: Transaction,
  ) {
    const { body } = request;
    const processedSurveyAnswers = body?.survey_data?.map((surveyQues) => {
      return {
        submitting_id: surveySubmittingId,
        question_id: surveyQues.question_id,
        category: surveyQues.category,
        answer: surveyQues.answer,
        question: surveyQuestionIdMap.get(Number(surveyQues.question_id))?.title,
        add_time: new Date(),
      };
    });

    return await this.surveySubmittingAnswerDAO.bulkCreateSurveyAnswer(processedSurveyAnswers, transaction);
  }
}
