/**
 * File: project.dao
 * Author: AKSHIKA CHOUDHARY
 * Date: 13-08-2024
 * Description: DAO service for project
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, Transaction } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class ProjectDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.ProjectModel!;
  }

  /**
   * Method to update project.
   * @param project_id
   * @param data
   * @param transaction
   * @returns
   */
  async updateProjectsDetails(project_id: number, data: any, transaction?: Transaction | null) {
    logger.debug(`ProjectDAO -> updateProjectsDetails :: updating record with data ${JSON.stringify(data)}`);
    return this.model.update({ ...data }, { where: { project_id }, transaction });
  }
}
