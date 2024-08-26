/**
 * File: plan.service
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 12-06-2024
 * Description: Service to handle Plan's APIs logic
 */

import { Service, Inject } from 'fastify-decorators';
import { BaseService } from '../common/services/base.service';
import { PlanDAO } from '../dao';
import { logger } from '../common/services/logger.service';

@Service()
export class PlanService extends BaseService {
  @Inject(PlanDAO)
  private planDAO!: PlanDAO;

  /**
   * Method to fetch plan details for given project_id and unit id
   * @param project_id
   * @param unit_id
   * @returns
   */
  async getPlanDetails(project_id: number, unit_id: number) {
    try {
      const plans = await this.planDAO.fetchPlanDetails(unit_id, project_id);
      if (!plans?.length) {
        logger.warn(
          `PlanService -> getPlanDetails : plans not found for unit_id : ${unit_id} and project_id${project_id}`,
        );
        return [];
      }
      return plans;
    } catch (error) {
      logger.error(
        `PlanService -> getPlanDetails : Failed to get plans for project_id :${project_id} and  unit_id :${unit_id}, error: ${error}`,
      );

      throw error;
    }
  }
}
