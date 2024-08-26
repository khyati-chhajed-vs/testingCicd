/**
 * File: demand.dao
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 19-07-2024
 * Description:
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';

import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { DEMAND_PAYMENT_STATUS } from '../common/constants';

@Service()
export class DemandDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.DemandModel!;
  }

  /**
   * Method to fetch pending payment demands for given project ID and unit ID
   * @param param0
   * @returns
   */
  async findPendingPayments({ project_id, unit_id, demand_type, limit, offset }) {
    const query = `SELECT 
     *,created_at add_time
    FROM tbl_demands
    WHERE project_id = ? 
    AND unit_id = ?
    ${demand_type ? `AND demand_type = '${demand_type}'` : ''}
    AND payment_status NOT IN ('${DEMAND_PAYMENT_STATUS.COMPLETED}')
    ORDER BY payment_due_date DESC
    limit ?  offset ?;
`;
    return await this.executeQueryWithParam({
      query,
      bindParams: [project_id, unit_id, limit, offset * limit],
    });
  }
}
