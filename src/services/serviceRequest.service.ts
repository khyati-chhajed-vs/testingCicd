/**
 * File: serviceRequest.service
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 18-06-2024
 * Description:Service to handle business logic of service request api
 */

import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';
import { ServiceRequestDAO } from '../dao';

import { logger } from '../common/services/logger.service';
import { GetAllServiceRequest } from '../types/v1';
import { FastifyRequest } from 'fastify';

@Service()
export class ServiceRequestService extends BaseService {
  @Inject(ServiceRequestDAO)
  private serviceRequestDAO!: ServiceRequestDAO;

  /**
   * Method to fetch all service request details for a given project_id and unit_id
   * @param request
   * @returns
   */
  async getAll(request: FastifyRequest<GetAllServiceRequest>) {
    logger.debug(
      `ServiceRequestService -> getAll: fetch details of all service request details for project_id: ${request.params.project_id}`,
    );
    try {
      const serviceRequestDetails = await this.serviceRequestDAO.getAll(request);

      return serviceRequestDetails ?? [];
    } catch (error) {
      logger.error(
        `ServiceRequestService -> getAll : Failed to get service request details for project_id :${request.params.project_id}`,
      );

      throw error;
    }
  }
}
