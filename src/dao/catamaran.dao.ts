/**
 * File: catamaran.dao
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 04-06-2024
 * Description: DAO class to do database operations of speed_boat
 */

import { Service } from 'fastify-decorators';

import { BaseDAO } from '../common/base.dao';
import { REQUEST_STATUS, STATUS, USER } from '../common/constants';
import { FastifyRequest } from 'fastify';
import { CreateCatamaranRequest, DeleteCatamaranRequest, GetCatamaranRequest } from '../types/v1';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { ModelDefined, Op } from 'sequelize';

@Service()
export class CatamaranDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.CatamaranModel!;
  }

  /**
   * Method to get all catamaran request of given
   * project ID and unit ID
   * @param request
   * @returns
   */
  async fetchAllRequest(request: FastifyRequest<GetCatamaranRequest>) {
    const query = `
    SELECT
      id,
      book_in_date,
      book_in_time ,
      slot.cost ,
      comments ,
      payment_status ,
      request_status ,
      catamaran.add_time,
      slot.from_time,
      slot.to_time ,
      number_of_pax
    FROM
      tbl_book_speedboat_order catamaran
    LEFT JOIN
     tbl_speed_boat_time_slots slot
    ON
      catamaran.slot_id = slot.slot_id
    WHERE
      project_id = ? and unit_id = ?
      ORDER BY catamaran.id DESC
    limit ? offset ?
    `;
    return await this.executeQueryWithParam({
      query,
      bindParams: [
        request.params.project_id,
        request.params.unit_id,
        request.query.limit,
        request.query.limit * request.query.offset,
      ],
    });
  }

  /**
   * Method to cancel catamaran request
   * for given request ID, project ID and unit ID
   * @param request
   * @returns
   */
  async deleteRequest(request: FastifyRequest<DeleteCatamaranRequest>) {
    const { params } = request;
    return await this.model.update(
      {
        deleted_by: USER,
        request_status: REQUEST_STATUS.DELETED_BY_USER,
        status: STATUS.DELETE,
        update_time: new Date(),
      },
      {
        where: {
          id: params.request_id,
          project_id: params.project_id,
          unit_id: params.unit_id,
          status: STATUS.ACTIVE,
          request_status: { [Op.in]: [REQUEST_STATUS.NOT_STARTED, REQUEST_STATUS.PROCESSING] },
        },
      },
    );
  }

  /**
   * Method to create catamaran request
   * for given project ID and unit ID
   * @param request
   * @returns
   */
  async createRequest(data: any) {
    logger.debug(
      `AirportPickupDAO -> createRequest :: creating airport request for project_id : ${data.project_id}, unit_id : ${data.unit_id}`,
    );

    return await this.create(this.model, data);
  }

  /**
   * Method to fetch catamran request for given
   * time_slot and book_in_date
   * @param request
   * @returns
   */
  async findBySlotId(request: FastifyRequest<CreateCatamaranRequest>) {
    const { body } = request;
    return await this.model.findOne({
      where: {
        status: STATUS.ACTIVE,
        request_status: REQUEST_STATUS.COMPLETED,
        book_in_date: body.book_in_date,
        slot_id: request.body.slot_id,
      },
    });
  }
}
