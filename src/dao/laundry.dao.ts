/**
 * File: laundry.dao
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 31-05-2024
 * Description: DAO class to do database operations on tbl_laundry
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, Op } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { REQUEST_STATUS, STATUS, USER } from '../common/constants';
import { GetLaundryRequest, LaundryDeleteRequest, LaundryPickupRequest } from '../types/v1';
import { FastifyRequest } from 'fastify';

@Service()
export class LaundryDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.LaundryModel!;
  }

  /**
   * Method to create laundry request for given project ID and unit ID
   * @param data
   * @returns
   */
  async createLaundryRequest(data) {
    logger.info(
      `LaundryDao -> createLaundryRequest :: Creating db entry of laundry request for project_id : ${data.project_id}, unit_id : ${data.unit_id}`,
    );
    return this.create(this.model, data);
  }

  /**
   * Method to check if there is anohter pending laundry request
   * for given project ID and unit ID
   * @param params
   * @returns
   */
  async findByRequestDateAndTime(request: FastifyRequest<LaundryPickupRequest>) {
    const { params, body } = request;
    const laundry = await this.findOne(this.model, {
      ...params,
      request_date: body.request_date,
      request_time: body.request_time,
      status: STATUS.ACTIVE,
    });

    logger.debug(
      `LaundryDAO -> findByStatus :: fetched laundry request for project_id : ${params.project_id}, unit_id : ${params.unit_id}. Details : ${JSON.stringify(laundry)}`,
    );

    return laundry;
  }

  /**
   * Method to delete laundry pickup request for given
   * project ID, unit ID and request ID
   * @param request
   * @returns
   */
  async deleteRequest(request: FastifyRequest<LaundryDeleteRequest>) {
    const { params } = request;

    logger.debug(
      `LaundryDao -> deleteRequest :: Deleting laundry request for project_id : ${params.project_id}, unit_id : ${params.unit_id}, request_id : ${params.request_id}`,
    );

    return this.model.update(
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
   * Method to get laundry pickup request history
   * for given project ID and unit ID
   * @param request
   */
  async getLaundaryRequests(request: FastifyRequest<GetLaundryRequest>) {
    const laundry = await this.model.findAll({
      where: {
        ...request.params,
        status: STATUS.ACTIVE,
      },
      attributes: ['id', 'request_date', 'request_time', 'comments', 'admin_comments', 'request_status'],
      order: [['id', 'DESC']],
      limit: request.query.limit,
      offset: request.query.limit * request.query.offset,
    });

    logger.debug(
      `LaundryDAO -> getLaundaryRequests :: Fetched requests are ${JSON.stringify(laundry)}, for project id : ${request.params.project_id} and unit_id : ${request.params.unit_id}. Details : ${JSON.stringify(laundry)}`,
    );
    return laundry;
  }
}
