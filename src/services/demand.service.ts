/**
 * File: demand.service
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 22-07-2024
 * Description: service to handle bussiness logic realted to demands
 */

import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';

import { DemandDAO } from '../dao';
import { FastifyRequest } from 'fastify';
import { GetPendingPaymentRequest } from '../types/v1';
import { logger } from '../common/services/logger.service';

@Service()
export class DemandService extends BaseService {
  @Inject(DemandDAO)
  private demandDAO!: DemandDAO;

  /**
   * Method to fetch pending payment demands for given project ID and unit ID
   * @param request
   */
  async get(request: FastifyRequest<GetPendingPaymentRequest>) {
    const { project_id, unit_id } = request.params;
    const { limit, offset, demand_type } = request.query;

    try {
      const pending_payments = await this.demandDAO.findPendingPayments({
        project_id,
        unit_id,
        demand_type,
        limit,
        offset,
      });

      //TODO : INTEREST AMOUNT CALCULATION LOGIC

      return pending_payments ?? [];
    } catch (error) {
      logger.error(
        `DemandService -> get : Failed to get pending demand for project_id :${request.params.project_id} unit_id :${request.params.unit_id} and demand_type :${request.query?.demand_type}, error: ${error}`,
      );

      throw error;
    }
  }
}
