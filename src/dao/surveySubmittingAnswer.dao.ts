/**
 * File: surveySubmittingAnswer.dao
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description:DAO class for database operations related to survey answer submission
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, Transaction } from 'sequelize';

import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { logger } from '../common/services/logger.service';

@Service()
export class SurveySubmittingAnswerDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.SurveySubmittingAnswerModel!;
  }

  /**
   * Method to bulk create survey submitted answers
   * @param body
   * @param params
   * @returns
   */
  async bulkCreateSurveyAnswer(data, transaction?: Transaction) {
    logger.debug(
      `SurveySubmittingAnswerDAO -> bulkCreateSurveyAnswer :: Saving survey record answers ${JSON.stringify(data)}`,
    );

    return await this.bulkCreate(this.model, data, transaction);
  }
}
