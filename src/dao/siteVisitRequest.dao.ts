/**
 * File: siteVisitRequest.dao
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 31-05-2024
 * Description: DAO to handle db request for tbl_site_visit_requests
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, QueryTypes, Op } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { REQUEST_STATUS, STATUS, USER } from '../common/constants';
import { DeleteSiteVisitRequest, SiteVisitRequest } from '../types/v1';
import { FastifyRequest } from 'fastify';

@Service()
export class SiteVisitRequestDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.SiteVisitRequestModel!;
  }

  /**
   * Method to create site visit request for given project ID and unit ID
   * @param body
   * @param params
   * @returns
   */
  async createRequest(data) {
    logger.debug(
      `SiteVisitRequestDAO -> createRequest :: Saving record for site visit request. project_id : ${data.project_id}, unit_id : ${data.unit_id} by user ${data.app_user_id}`,
    );

    return this.create(this.model, data);
  }

  /**
   * Method to check if site visit request already exist for project and unit id
   * @param title
   * @param params
   */
  async findByRequestDateAndTime(request: FastifyRequest<SiteVisitRequest>) {
    const { params, body } = request;
    const siteVisitRequest = await this.findOne(this.model, {
      ...params,
      request_date: body.request_date,
      request_time: body.request_time,
      status: STATUS.ACTIVE,
    });

    logger.debug(
      `SiteVisitRequestDAO -> findByRequestDateAndTime :: fetched request for project_id : ${params.project_id}, unit_id : ${params.unit_id}. Details : ${JSON.stringify(siteVisitRequest)}`,
    );

    return siteVisitRequest;
  }

  /**
   * Method to get site visit request for project and unit id
   * @param project_id
   * @param unit_id
   * @param limit
   * @param offset
   * @returns object[]
   */
  async fetchAllSiteVisitRequests({ project_id, unit_id, limit, offset }) {
    const query = `
    SELECT id, request_date, request_time, comments, request_status
    FROM tbl_site_visit_requests
      WHERE 
        project_id = ${project_id} AND unit_id = ${unit_id}
        ORDER BY id DESC
        limit ${limit} 
        offset ${offset * limit};
      `;

    logger.debug(
      `SiteVisitRequestDAO -> findByProjectIdAndUnitId :: Fetched site visit requests for project_id : ${project_id}. unit_id  ${unit_id}`,
    );

    return SequelizeClient.sequelize.query(query, { type: QueryTypes.SELECT });
  }

  /*
   * Method to delete site visit request for given
   * request ID, unit ID and project ID
   * @param request
   * @returns
   */
  async deleteRequest(request: FastifyRequest<DeleteSiteVisitRequest>) {
    const { params } = request;

    logger.debug(
      `SiteVisitRequestDAO -> deleteRequest :: Deleting site visit request for project_id : ${params.project_id}, unit_id : ${params.unit_id}, request_id : ${params.request_id}`,
    );

    return await this.model.update(
      {
        deleted_by: USER,
        status: STATUS.DELETE,
        request_status: REQUEST_STATUS.DELETED_BY_USER,
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
}
