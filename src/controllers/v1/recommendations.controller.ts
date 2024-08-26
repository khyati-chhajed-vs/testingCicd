/**
 * File: exploreGoa.controller
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 29-05-2024
 * Description: Controller for explore goa
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject } from 'fastify-decorators';

import {
  BASE_ENDPOINT,
  RECOMMENDATIONS_ENDPOINT,
  STATUS_CODES,
  CATEGORY_ID_ENDPOINT,
  CATEGORY_ENDPOINT,
} from '../../common/constants';
import { AuthController } from '../../common/controllers/auth.controller';
import { GetRecommendationsResponseSchema } from '../../schema/v1';
import { RecommendationsService } from '../../services';
import { RecommendationsRequest } from '../../types/v1';
import { logger } from '../../common/services/logger.service';

@Controller({
  route: BASE_ENDPOINT + RECOMMENDATIONS_ENDPOINT,
})
export default class RecommendationsController extends AuthController {
  @Inject(RecommendationsService)
  private recommendationsService!: RecommendationsService;

  /**
   * API to fetch Recommendation by given category ID and area ID
   * @param request
   * @param reply
   */
  @GET(CATEGORY_ENDPOINT + CATEGORY_ID_ENDPOINT, {
    schema: GetRecommendationsResponseSchema,
  })
  async get(request: FastifyRequest<RecommendationsRequest>, reply: FastifyReply) {
    logger.info(
      `RecommendationsController -> get :: Request to fetch recommendations for category_id : ${request.params.category_id}, area_id : ${request.query.area_id}`,
    );

    const recommendations = await this.recommendationsService.getRecommendations(request);

    logger.info(
      `RecommendationsController -> get :: Successfully fetched recommendations. category_id : ${request.params.category_id}, area_id : ${request.query.area_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(recommendations);
  }
}
