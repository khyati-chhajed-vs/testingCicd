/**
 * File: catamaranConfig.service
 * Author: Akshika.Choudhary
 * Date: 11-05-2024
 * Description: Service to get catamaran config
 */

import { Service, Inject } from 'fastify-decorators';
import { BaseService } from '../common/services/base.service';
import { logger } from '../common/services/logger.service';
import { CatamaranConfigDAO } from '../dao';
import { ERROR_CODES } from '../common/constants';
import { NotFoundError } from '../common/exceptions/errors';

@Service()
export class CatamaranConfigService extends BaseService {
  @Inject(CatamaranConfigDAO)
  private catamaranConfigDAO!: CatamaranConfigDAO;

  /**
   * catamaran is an watercraft
   * This method fetches data for catamaran configuration.
   * @returns An array of catamaran configuration details. Returns an empty array if no configuration is found.
   */

  async fetchCatamaranConfigurationDetail() {
    logger.debug('CatamaranService -> fetchCatamaranConfigurationDetail : Fetching all catamaran configuration data');

    try {
      const [[catamaranConfigDetails], slots]: any = await Promise.all([
        this.catamaranConfigDAO.findCatamaranConfigDetails(),
        this.catamaranConfigDAO.fetchCatamaranTimeSlots(),
      ]);
      if (!catamaranConfigDetails) {
        logger.warn(`CatamaranService -> fetchCatamaranConfigurationDetail : No Catamaran Configuration found `);
        throw new NotFoundError(ERROR_CODES.NOT_FOUND);
      }
      logger.debug('ConfigurationService -> fetchCatamaranConfigurationDetail : Successfully fetched all data');
      let catamaranConfig = { ...catamaranConfigDetails, slots };
      return catamaranConfig;
    } catch (error: any) {
      logger.error(`ConfigurationService -> fetchCatamaranConfigurationDetail : Failed to fetch data. Error: ${error}`);
      throw error;
    }
  }
}
