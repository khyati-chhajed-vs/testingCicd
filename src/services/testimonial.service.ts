/**
 * File: testimonial.service
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 23-07-2024
 * Description: Service to handle logic of testimonials APIs
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';
import { TestimonialDAO } from '../dao';
import { GetTestimonials } from '../types/v1';
import { logger } from '../common/services/logger.service';

@Service()
export class TestimonialService extends BaseService {
  @Inject(TestimonialDAO)
  private testimonialDAO!: TestimonialDAO;

  /**
   * Method to fetch customer testimonial
   * for given project ID and unit ID
   * @param request
   * @returns
   */
  async get(request: FastifyRequest<GetTestimonials>) {
    try {
      const testimonials = await this.testimonialDAO.fetch(request);

      logger.debug(
        `TestimonialService -> get :: fetched testimonials : ${testimonials} for project id : ${(request.params.project_id, request.params.unit_id)}`,
      );

      return testimonials ?? [];
    } catch (error) {
      logger.error(
        `TestimonialService -> get :: Failed to fetch customer testimonials. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}, error : ${error}`,
      );

      throw error;
    }
  }
}
