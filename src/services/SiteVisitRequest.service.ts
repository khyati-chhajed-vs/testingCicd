/**
 * File: siteVisitRequest.service
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 31-05-2024
 * Description: Service to handle logic of site visit request APIs
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { APPLICATION_NAME, HOURS_CONSTANTS, SITE_VISIT_REQUEST_ERR } from '../common/constants';
import { BadRequestError } from '../common/exceptions/errors';
import { BaseService } from '../common/services/base.service';
import { DateUtils } from '../common/utils';
import { SiteVisitRequestDAO } from '../dao';
import { GetSiteVisitRequest, DeleteSiteVisitRequest, SiteVisitRequest } from '../types/v1';
import { logger } from '../common/services/logger.service';

@Service()
export class SiteVisitRequestService extends BaseService {
  @Inject(SiteVisitRequestDAO)
  private siteVisitRequestDAO!: SiteVisitRequestDAO;

  /**
   * Method to create site visit request for given project ID and unit ID
   * @param request
   * @param user_id
   * @param project_status
   * @returns
   */
  async create(request: FastifyRequest<SiteVisitRequest>) {
    const { params, body } = request;

    try {
      await this.checkDuplicate(request);

      return await this.siteVisitRequestDAO.createRequest({
        ...body,
        email: request.decodedToken?.email ?? 'vianaarhomes@gmail.com',
        mobile: request.decodedToken?.phone_number ?? '1234567894',
        name: request.decodedToken?.user_name ?? 'vianaar homes',
        user_id: request.decodedToken?.vianaar_uid ?? 1438,
        project_id: params.project_id,
        unit_id: params.unit_id,
        add_time: new Date(),
        add_by: APPLICATION_NAME,
        tat_twenty_four: DateUtils.addHoursToDate(new Date(), HOURS_CONSTANTS.TWENTY_FOUR),
        tat_forty_eight: DateUtils.addHoursToDate(new Date(), HOURS_CONSTANTS.FORTY_EIGHT),
      });
    } catch (error) {
      logger.error(
        `SiteVisitRequestService -> create :: Request failed to create site visit request. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
      );

      throw error;
    }
  }

  /**
   * Method to fetch the site visit request by
   * project ID and unit ID
   * @param request {GetSiteVisitRequest}
   * @returns
   */

  async get(request: FastifyRequest<GetSiteVisitRequest>) {
    const { project_id, unit_id } = request.params;
    const { limit, offset } = request.query;

    try {
      const siteVistRequests = await this.siteVisitRequestDAO.fetchAllSiteVisitRequests({
        project_id,
        unit_id,
        limit,
        offset,
      });
      return siteVistRequests ?? [];
    } catch (error: any) {
      logger.error(
        `SiteVisitRequestService -> get : Failed to get site visit requests for project_id :${project_id} unit_id :${unit_id}, error: ${error}`,
      );

      throw error;
    }
  }

  /**
   * API to check if there already exist site visit request
   * for given projec ID and unit ID
   * @param params
   */
  private async checkDuplicate(request: FastifyRequest<SiteVisitRequest>) {
    const { params } = request;
    logger.info(
      `SiteVisitRequestService -> createRequest : Checking for duplicate site visit request. project_id : ${params.project_id}, unit_id : ${params.unit_id}`,
    );

    const duplicateRequest = await this.siteVisitRequestDAO.findByRequestDateAndTime(request);

    if (duplicateRequest) {
      logger.error(
        `SiteVisitRequestService -> createRequest : site visit request exists. project_id : ${params.project_id}, unit_id : ${params.unit_id}`,
      );

      throw new BadRequestError(SITE_VISIT_REQUEST_ERR.ALREADY_EXISTS.CODE);
    }

    logger.info(
      `SiteVisitRequestService -> createRequest : No duplicate site visit request found. project_id : ${params.project_id}, unit_id : ${params.unit_id}`,
    );
  }

  /**
   * Method to delete site visit request for given
   * request ID, project ID and unit ID
   * @param request
   */
  async delete(request: FastifyRequest<DeleteSiteVisitRequest>) {
    try {
      const { params } = request;
      const [siteVisitRequest] = await this.siteVisitRequestDAO.deleteRequest(request);

      if (!siteVisitRequest) {
        logger.error(
          `SiteVisitRequestService ->  delete : Invalid Delete Request. project_id : ${params.project_id}, unit_id : ${params.unit_id} and request_id : ${params.request_id}`,
        );

        throw new BadRequestError(SITE_VISIT_REQUEST_ERR.BAD_REQUEST.CODE, SITE_VISIT_REQUEST_ERR.BAD_REQUEST.MESSAGE);
      }
    } catch (error) {
      logger.error(
        `SiteVisitRequestService -> delete :: Failed to delete site visit request, project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
      );

      throw error;
    }
  }
}
