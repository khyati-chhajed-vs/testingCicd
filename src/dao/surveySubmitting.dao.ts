/**
 * File: surveySubmitting.dao
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description:DAO class for database operation related to db table tbl_feedback_submitting
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, Transaction } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class SurveySubmittingDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.SurveySubmittingModel!;
  }

  /**
   * Method to save user data for a survey submission
   * @param body
   * @param params
   * @returns
   */
  async createRequest(data, transaction?: Transaction) {
    logger.debug(
      `SurveySubmittingDAO -> createRequest :: Saving user record for submission of survey data :${JSON.stringify(data)}`,
    );

    return await this.model.create(data, {
      transaction,
    });
  }
}
