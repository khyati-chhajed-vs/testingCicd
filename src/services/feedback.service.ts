/**
 * File: feedback.service
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 11-06-2024
 * Description: Service to handle logic of feedback APIs
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';
import { FeedbackDAO } from '../dao';
import { GetFeedbackRequest, SubmitFeedbackRequest } from '../types/v1';
import { logger } from '../common/services/logger.service';

@Service()
export class FeedbackService extends BaseService {
  @Inject(FeedbackDAO)
  private feedbackDAO!: FeedbackDAO;

  /**
   * Method to submit feedback for given project ID and unit ID
   * @param request
   * @returns
   */
  async create(request: FastifyRequest<SubmitFeedbackRequest>) {
    const { params, body } = request;

    try {
      return await this.feedbackDAO.submit({
        ...body,
        ...params,
        user_id: request.decodedToken?.vianaar_uid ?? 1438,
        add_time: new Date(),
      });
    } catch (error) {
      logger.error(
        `FeedbackService -> create :: Failed to submit feedback. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}, error : ${error}`,
      );

      throw error;
    }
  }

  /**
   * Method to get feedback for given project ID and unit ID
   * @param request
   * @returns
   */

  async get(request: FastifyRequest<GetFeedbackRequest>) {
    try {
      const feedbacks = await this.feedbackDAO.fetch(request);
      if (!feedbacks.length) {
        logger.warn(
          `FeedbackService -> get : no feedback found for project_id : ${request.params.project_id} and unit_id : ${request.params.unit_id}`,
        );
        return [];
      }
      return feedbacks;
    } catch (error) {
      logger.error(
        `FeedbackService -> get :: Failed to fecth feedback. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}, error : ${error}`,
      );

      throw error;
    }
  }
}
