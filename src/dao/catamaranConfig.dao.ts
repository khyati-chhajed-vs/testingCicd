/**
 * File: catamaranConfigDAO
 * Author: Akshika Choudhary
 * Date: 11-06-2024
 * Description: DAO service for catamaran configuration
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, QueryTypes } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class CatamaranConfigDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.CatamaranConfigModel!;
  }

  /**
   * Method to find catamaran config.
   * @returns object[]
   */
  async findCatamaranConfigDetails() {
    logger.debug(`CatamaranConfigDAO -> findCatamaranConfigDetails :: To fetch all catamaran configuration details `);
    return this.model.findAll({
      raw: true,
    });
  }

  /**
   * Method to fetch catamaran time slots
   * @returns
   */
  async fetchCatamaranTimeSlots() {
    const slots = `
    SELECT 
      slot_id as id  , CONCAT_WS(' - ',from_time,to_time) as slot
    FROM 
      tbl_speed_boat_time_slots  
    ORDER BY from_time ASC`;
    return SequelizeClient.sequelize.query(slots, { type: QueryTypes.SELECT });
  }
}
