/**
 * File: serviceRequest.dao
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 18-06-2024
 * Description:This DAO (Data Access Object) class provides methods for performing database operations
 *               related to the tbl_service_requests
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';

import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

import { FastifyRequest } from 'fastify';
import { logger } from '../common/services/logger.service';
import { GetAllServiceRequest } from '../types/v1';

@Service()
export class ServiceRequestDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.ServiceRequestModel!;
  }

  /**
   * Method to fetch all service request details for a given project_id and unit_id
   * @param request
   * @returns
   */
  async getAll(request: FastifyRequest<GetAllServiceRequest>) {
    const { project_id, unit_id } = request.params,
      { limit, offset } = request.query;
    logger.debug(
      `ServiceRequestDAO -> getAll :: fetching all service requests for project_id: ${project_id} and unit_id: ${unit_id}`,
    );
    return await this.model.findAll({
      where: {
        project_id,
        unit_id,
      },
      attributes: [
        'id',
        'request_date',
        'request_time',
        'title',
        'description',
        'add_by',
        'request_status',
        'created_at',
      ],
      order: [['id', 'DESC']],
      limit: limit,
      offset: limit * offset,
    });
  }
}
