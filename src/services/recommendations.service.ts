/**
 * File: exploreGoa.service
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 29-05-2024
 * Description: Service to handle Explore goa's APIs logic
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';
import { RecommendationDAO } from '../dao';
import { RecommendationsRequest } from '../types/v1';
import { logger } from '../common/services/logger.service';
import { NotFoundError } from '../common/exceptions/errors';
import { RECOMMENDATION_ERR } from '../common/constants';

@Service()
export class RecommendationsService extends BaseService {
  @Inject(RecommendationDAO)
  private recommendationDAO!: RecommendationDAO;

  /**
   * Method to fetch recommendation for given category ID
   * @param request
   * @returns
   */
  async getRecommendations(request: FastifyRequest<RecommendationsRequest>) {
    try {
      const recommendations: any = await this.recommendationDAO.getByCategoryIdAndAreaId(request);

      logger.debug(
        `RecommendationsService -> getRecommendations :: Fetched all categories and recommendation for explore goa. category_id : ${request.params.category_id}, details : ${recommendations}, area_id : ${request.query.area_id}`,
      );

      if (!recommendations && !recommendations.length) {
        logger.warn(
          `RecommendationsService -> getRecommendations : No recommendations found for category_id : ${request.params.category_id}, area_id : ${request.query.area_id}`,
        );
        return [];
      }
      return recommendations;
    } catch (error) {
      logger.error(
        `RecommendationsService -> getRecommendations : Failed to fetch recommendations for category_id :${request.params.category_id} and area_id : ${request.query.area_id}, error: ${error}`,
      );

      throw error;
    }
  }

  /**
   * Method to fetch all recommendation categories
   * @returns
   */
  async fetchRecommendationCategories() {
    logger.debug(`RecommendationsService -> fetchRecommendationCategories: fetch document categories`);
    try {
      const recommendationCategories: [] = await this.recommendationDAO.fetchCategory();

      if (!recommendationCategories?.length) {
        logger.error(`RecommendationsService -> fetchRecommendationCategories : Recommendation category not found`);
        throw new NotFoundError(RECOMMENDATION_ERR.NOT_FOUND.CODE);
      }

      return recommendationCategories;
    } catch (error) {
      logger.error(
        `RecommendationsService -> fetchRecommendationCategories : Failed to fecth recommendation categories. error: ${error}`,
      );

      throw error;
    }
  }
}
