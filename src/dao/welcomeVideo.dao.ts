/**
 * File: configurationDAO
 * Author: Akshika Choudhary
 * Date: 3-05-2024
 * Description: DAO service for configuration
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, QueryTypes } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class WelcomeVideoDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.WelcomeVideoModel!;
  }

  /**
   * Method to fetch welcome videos for both ongoing and completed project.
   * @returns
   */
  async fetch() {
    logger.debug(`WelcomeVideoDAO -> fetch :: To fetch welcome videos for both ongoing and completed project type`);
    const welcomeVideos = `SELECT 
     welcomeVideo.id,
     welcomeVideo.project_type as project_status ,
     welcomeVideo.file as video_name
    
  FROM 
    tbl_welcome_videos welcomeVideo
  WHERE 
    welcomeVideo.status = "ACTIVE"
  `;

    return SequelizeClient.sequelize.query(welcomeVideos, { type: QueryTypes.SELECT });
  }
}
