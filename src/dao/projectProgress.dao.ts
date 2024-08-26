/**
 * File: projectProgress.dao
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 06-06-2024
 * Description: DAO service for project progress
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class ProjectProgressDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.ProjectProgressModel!;
  }

  /**
   * Method to fetch project progress details for a given project_id
   * @param project_id
   */
  async getProgessDetails(project_id: number) {
    logger.debug(`ProjectProgressDAO->getProgessDetails : fetching project progress details: ${project_id}`);

    const query = `
        SELECT 
    IFNULL(
        CAST(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'title', project_progress.progress_date,
                    'images', images_data.images
                )
            ) AS JSON
        ), 
        JSON_ARRAY()
    ) AS progressdata
FROM 
    tbl_project_progress project_progress
JOIN (
    SELECT 
        progress_id, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'image_url', image_name, 
                'image_date', DATE_FORMAT(add_time, '%Y-%m-%d %H:%i:%s')
            )
        ) AS images
    FROM 
        tbl_project_progress_images
    WHERE 
        status = 'ACTIVE'
    GROUP BY 
        progress_id
) images_data 
ON 
    project_progress.progress_id = images_data.progress_id
WHERE 
    project_progress.project_id = ? 
    AND 
    project_progress.status = 'ACTIVE';
`;

    return await this.executeQueryWithParam({ query, bindParams: [project_id] });
  }
}
