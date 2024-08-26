/**
 * File: unit.dao
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 07-06-2024
 * Description:DAO service for units related db operations
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';
import { logger } from '../common/services/logger.service';

import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class UnitDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.UnitModel!;
  }

  /**
   * Method to fetch unit details for a given unit_id
   * @returns
   */
  async getUnitDetais(unit_id: number) {
    logger.debug(`UnitDAO -> getUnitDetais :: To fetch unit details for unit_id: ${unit_id}`);
    return await this.findById(this.model, unit_id);
  }
}
