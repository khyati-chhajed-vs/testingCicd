/**
 * File: feedback.dao
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 11-06-2024
 * Description: DAO to handle db request for tbl_feedback
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { GetFeedbackRequest, SubmitFeedbackData } from '../types/v1';
import { FastifyRequest } from 'fastify';

@Service()
export class FeedbackDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.FeedbackModel!;
  }

  /**
   * Method to submit feedback for given project ID and unit ID
   * @param data
   * @returns
   */
  async submit(data: SubmitFeedbackData) {
    logger.debug(`FeedbackDAO -> submit : Creating feedback with data : ${JSON.stringify(data)}`);
    return this.create(this.model, data);
  }

  /**
   * Method to fetches feedback records for given project ID and unit ID
   * @param request <GetFeedbackRequest>
   * @returns
   */

  async fetch(request: FastifyRequest<GetFeedbackRequest>) {
    logger.info(
      `FeedbackDAO -> fetch :: fetched feedback for project_id : ${request.params.project_id} and unit_id : ${request.params.unit_id}`,
    );
    return await this.model.findAll({
      where: { ...request.params },
      attributes: ['id', 'title', 'comment', 'add_time'],
      order: [['id', 'DESC']],
      limit: request.query.limit,
      offset: request.query.limit * request.query.offset,
    });
  }
}
