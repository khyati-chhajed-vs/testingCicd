/**
 * File: welcomeVideo.service
 * Author: Akshika.Choudhary
 * Date: 07-05-2024
 * Description: Service class for welcomeVideo
 */

import { Service, Inject } from 'fastify-decorators';
import { BaseService } from '../common/services/base.service';
import { WelcomeVideoDAO } from '../dao';
import { NotFoundError } from '../common/exceptions/errors';
import { CONFIG_ERROR } from '../common/constants/configuration.constant';
import { logger } from '../common/services/logger.service';

@Service()
export class WelcomeVideoService extends BaseService {
  @Inject(WelcomeVideoDAO)
  private welcomeVideoDAO!: WelcomeVideoDAO;

  /**
   * Method to fetch welcome videos for ongoing project and completed project.
   * @returns
   */

  async fetchWelcomeVideos() {
    logger.debug(`WelcomeVideoService -> fetchWelcomeVideos: fetch welcome videos`);
    try {
      const welcomeVideos = await this.welcomeVideoDAO.fetch();

      if (!welcomeVideos?.length) {
        logger.error(`WelcomeVideoService -> fetchWelcomeVideos : Welcome videos not found`);
        throw new NotFoundError(CONFIG_ERROR.WELCOME_VIDEOS_NOT_FOUND.CODE);
      }

      return welcomeVideos || [];
    } catch (error) {
      logger.error(`WelcomeVideoService -> fetchWelcomeVideos : Failed to fetch welcome videos and error: ${error}`);

      throw error;
    }
  }
}
