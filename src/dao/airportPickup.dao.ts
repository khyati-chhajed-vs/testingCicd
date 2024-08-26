/**
 * File: airportPickup.dao
 * Author: manoj.fulara@vectoscalar.com
 * Date: 24-05-2024
 * Description:  This DAO (Data Access Object) class provides methods for performing database operations
 *               related to the tbl_airportpickup table
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, Op } from 'sequelize';

import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { REQUEST_STATUS, STATUS } from '../common/constants';
import { FastifyRequest } from 'fastify';
import { logger } from '../common/services/logger.service';
import { CreateAirportPickupRequest, GetAirportRequest } from '../types/v1';

@Service()
export class AirportPickupDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.AirportPickupModel!;
  }

  /**
   * Method to create airport pickup request for
   * given project ID and unit ID
   * @param data
   * @returns
   */
  async createRequest(data: any) {
    logger.debug(
      `AirportPickupDAO -> createRequest :: creating airport request for project_id : ${data.project_id}, unit_id : ${data.unit_id}`,
    );

    return this.create(this.model, data);
  }

  /**
   * Method to find airport pickup request for given
   * flight number, project ID and unit ID
   * @param request
   * @returns
   */
  async findByAirportIdAndStatus(request: FastifyRequest<CreateAirportPickupRequest>) {
    const { body, params } = request;

    return this.findOne(this.model, {
      ...params,
      request_status: { [Op.in]: [REQUEST_STATUS.NOT_STARTED, REQUEST_STATUS.PROCESSING] },
      status: STATUS.ACTIVE,
      airport_id: body.airport_id,
      request_date: body.request_date,
      request_time: body.request_time,
    });
  }

  /**
   * Method to cancel airport pickup request
   * for given project ID, unit ID and request ID
   * @param data
   * @returns
   */
  async cancel(id: number, project_id: number, unit_id: number, user_id: number, data) {
    logger.debug(
      `AirportPickupDAO -> cancelRequest :: cancelling airport pickup request for project_id : ${project_id}, unit_id : ${unit_id} by user ${user_id}`,
    );
    return this.model.update(
      { ...data },
      {
        where: {
          id,
          project_id,
          unit_id,
          status: STATUS.ACTIVE,
          request_status: { [Op.in]: [REQUEST_STATUS.NOT_STARTED, REQUEST_STATUS.PROCESSING] },
        },
      },
    );
  }

  /**
   * Method to get airport pickup request history
   * for given project ID and unit ID
   * @param project_id
   * @param unit_id
   */
  async getAllRequests(request: FastifyRequest<GetAirportRequest>) {
    const { project_id, unit_id } = request.params;
    logger.debug(
      `AirportPickupDAO -> getAllRequests :: To fetch all airport pickup requests for project_id: ${project_id} and unit_id: ${unit_id}`,
    );
    return await this.model.findAll({
      where: { ...request.params, status: STATUS.ACTIVE },
      attributes: [
        'id',
        'request_date',
        'request_time',
        'airport_id',
        'number_of_pax',
        'number_of_luggage',
        'request_status',
      ],
      order: [['id', 'DESC']],
      limit: request.query.limit,
      offset: request.query.limit * request.query.offset,
      paranoid: true,
      raw: true,
    });
  }
}
