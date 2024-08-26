/**
 * File: testimonial.dao
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 23-07-2024
 * Description: DAO to handle db request for tbl_customer_testimonials
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { GetTestimonials } from '../types/v1';
import { FastifyRequest } from 'fastify';

@Service()
export class TestimonialDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.TestimonialModel!;
  }

  /**
   * Method to fetch customer testimonial
   * for given project ID and unit ID
   * @param unit_id
   * @param project_id
   * @returns
   */
  async fetch(request: FastifyRequest<GetTestimonials>) {
    return await this.model.findAll({
      where: { project_id: request.params.project_id, unit_id: request.params.unit_id },
      attributes: ['id', 'rating', 'review', 'add_time'],
      order: [['id', 'DESC']],
      limit: request.query.limit,
      offset: request.query.limit * request.query.offset,
    });
  }
}
