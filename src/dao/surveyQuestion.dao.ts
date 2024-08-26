/**
 * File: surveySubmittingAnswer.dao
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description:DAO class for database operation related to survey questions
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, Sequelize } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { STATUS } from '../common/constants';

@Service()
export class SurveyQuestionDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.SurveyQuestionModel!;
  }

  /**
   * Method to find all questions by project status
   * @param {project_status}
   * @returns object[]
   */
  async findQuestionByProjectStatus(project_status: string) {
    logger.debug(
      `SurveyQuestionDAO -> findQuestionByProjectStatus :: fetching survey questions data by project status ${project_status}`,
    );

    return await this.findAll(this.model, { project_status, status: STATUS.ACTIVE }, [
      [Sequelize.col('id'), 'question_id'],
      'title',
      'category',
    ]);
  }

  /**
   * Method to retrieve the feedback description that specifies the context or purpose of the feedback.
   * @param {project_status}
   * @returns object[]
   */
  async findFeedbackIntro(project_status: string) {
    logger.debug(
      `SurveyQuestionDAO -> findFeedbackIntro :: fetching feedback intro by project status ${project_status}`,
    );
    const query = `SELECT title from tbl_feedback_intro where project_status = ? AND status = 'ACTIVE'`;

    return await this.executeQueryWithParam({ query, bindParams: [project_status] });
  }
}
