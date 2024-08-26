/**
 * File: plan.dao
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 12-06-2024
 * Description: Class to handle database requet of plans APIs
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class PlanDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.PlanModel!;
  }

  /**
   * Method to fetch plan details for given project_id and unit id
   * @param unit_id
   * @param project_id
   * @returns
   */
  async fetchPlanDetails(unit_id: number, project_id: number) {
    logger.debug(
      `PlanDAO -> fetchPlanDetails :: fetching plans and images data
       for project_id : ${project_id} and unit_id : ${unit_id}`,
    );

    const query = `
    SELECT
      tbl_plans.id,tbl_plan_images.title,tbl_plan_images.file as image_url
    FROM
      tbl_plans
    LEFT JOIN tbl_plan_images
    ON tbl_plans.id = tbl_plan_images.plan_id
    WHERE
      project_id = ? AND unit_id = ? AND status = 'ACTIVE'
    `;

    return await this.executeQueryWithParam({ query, bindParams: [project_id, unit_id] });
  }
}
