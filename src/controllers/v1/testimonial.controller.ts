/**
 * File: customerTestimonial.controller
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 15-07-2024
 * Description: Controller for customer testimonial related APIs
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject } from 'fastify-decorators';
import { logger } from '../../common/services/logger.service';

import {
  BASE_ENDPOINT,
  STATUS_CODES,
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
} from '../../common/constants';
import { GetTestimonialResponseSchema } from '../../schema/v1';
import { TestimonialService } from '../../services';
import { GetTestimonials } from '../../types/v1';
import { AuthController } from '../../common/controllers/auth.controller';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { TESTIMONIAL_ENDPOINT } from '../../common/constants/testimonial.constant';

@Controller({
  route:
    BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + TESTIMONIAL_ENDPOINT,
})
export default class TestimonialController extends AuthController {
  @Inject(TestimonialService)
  private testimonialService!: TestimonialService;

  /**
   * API to get customer testimonial for given project ID and unit ID
   * @param request
   * @param reply
   */
  @GET('', {
    schema: GetTestimonialResponseSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async get(request: FastifyRequest<GetTestimonials>, reply: FastifyReply) {
    logger.info(
      `TestimonialController -> get :: Request to get customer tetsimonials for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    const testimonials = await this.testimonialService.get(request);

    logger.info(
      `TestimonialController -> get :: Fetched customer tetsimonials for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(testimonials);
  }
}
