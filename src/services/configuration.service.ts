/**
 * File: configuration.service
 * Author: Akshika.Choudhary
 * Date: 07-05-2024
 * Description: Service class for configuration
 */

import { Service, Inject } from 'fastify-decorators';
import { BaseService } from '../common/services/base.service';
import { ConfigurationDAO } from '../dao';
import { WelcomeVideoService } from './welcomeVideo.service';
import { DocumentService } from './document.service';
import { CatamaranConfigService } from './catamaranConfig.service';
import { logger } from '../common/services/logger.service';
import { RecommendationsService } from './recommendations.service';
import { NotFoundError } from '../common/exceptions/errors';
import { CONFIG_ERROR } from '../common/constants/configuration.constant';
import { CleaningService } from './cleaning.service';

@Service()
export class ConfigurationService extends BaseService {
  @Inject(ConfigurationDAO)
  private configurationDAO!: ConfigurationDAO;

  @Inject(CatamaranConfigService)
  private catamaranConfigService!: CatamaranConfigService;

  @Inject(WelcomeVideoService)
  private welcomeVideoService!: WelcomeVideoService;

  @Inject(DocumentService)
  private documentService!: DocumentService;

  @Inject(RecommendationsService)
  private recommendationsService!: RecommendationsService;

  @Inject(CleaningService)
  private cleaningService!: CleaningService;

  /**
   * This method fetches airport details.
   * @returns
   */

  async fetchAirportDetails() {
    logger.debug('ConfigurationService -> fetchAirportDetails : Fetching airport details');
    try {
      return await this.configurationDAO.findAirportDetails();
    } catch (error) {
      // Log the error with more context
      logger.error(`ConfigurationService -> fetchAirportDetails: Failed to fetch data. Error: ${error}`);
      throw error;
    }
  }

  /**
   * This method fetches data for configuration, welcome videos, and document categories.
   * @returns
   */
  async fetchConfigurationDetail() {
    logger.debug('ConfigurationService -> fetchConfigurationDetail: Fetching all configuration data');

    try {
      const [configurationDetails, welcomeVideos, documentCategories, recommendationCategories, cleaningType] =
        await Promise.all([
          this.configurationDAO.findConfigDetails(),
          this.welcomeVideoService.fetchWelcomeVideos(),
          this.documentService.fetchDocumentCategories(),
          this.recommendationsService.fetchRecommendationCategories(),
          this.cleaningService.getCleaningTypes(),
        ]);

      if (!configurationDetails) {
        logger.error(`ConfigurationService -> fetchConfigurationDetail : Configuration data not found`);
        throw new NotFoundError(CONFIG_ERROR.CONFIGURATION_NOT_FOUND.CODE);
      }

      return {
        ...configurationDetails,
        welcome_videos: welcomeVideos,
        document_categories: documentCategories,
        recommendation_categories: recommendationCategories,
        cleaning_type: cleaningType,
      };
    } catch (error) {
      logger.error(`ConfigurationService -> fetchConfigurationDetail: Failed to fetch data. Error: ${error}`);
      throw error;
    }
  }
}
