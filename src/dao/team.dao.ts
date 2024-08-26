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
export class TeamDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.TeamProjectsModel!;
  }

  /**
   * Method to fetch details of all team members associated to a project
   * @returns
   */
  async fetch(project_id: number) {
    logger.debug(`TeamDAO -> fetch :: To fetch all team members detail associated to a project `);
    const query = `
      SELECT teams.id,teams.title, teams.designation, teams.image as image_url, teams.phone_number
      FROM tbl_teams teams
      JOIN tbl_teams_projects teamsProject ON teams.id = teamsProject.teams_id
      WHERE teamsProject.project_id = ${project_id};
      `;
    return SequelizeClient.sequelize.query(query, { type: QueryTypes.SELECT });
  }
}
