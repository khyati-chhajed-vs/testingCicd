/**
 * File: configurationDAO
 * Author: Akshika Choudhary
 * Date: 3-05-2024
 * Description: DAO service for configuration
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';

import { SequelizeClient } from '../clients';
import { logger } from '../common/services/logger.service';
import { BaseDAO } from '../common/base.dao';

@Service()
export class ConfigurationDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.ConfigurationModel!;
  }

  /**
   * Method to find airport details .
   * @returns
   */
  async findAirportDetails() {
    logger.debug(`ConfigurationDAO -> findAirportDetails :: To fetch find Airport Details `);
    const airportDetails = await this.model.findAll({
      where: { key: 'airport_details' },
      attributes: ['json_value'],
      raw: true,
    });

    return airportDetails;
  }

  /**
   * Method to find all the configs key and value.
   * @returns
   */
  async findConfigDetails() {
    logger.debug(`ConfigurationDAO -> findConfigDetails :: To fetch all app configuration details `);
    const configs = await this.model.findAll({
      attributes: ['key', 'value', 'json_value'],
      where: { deleted_at: null },
      raw: true,
    });

    const configDetails = {};
    configs.forEach((config: any) => {
      if (!config.json_value) {
        configDetails[config.key] = config.value;
      } else {
        configDetails[config.key] = config.json_value;
      }
    });

    return configDetails;
  }
}
