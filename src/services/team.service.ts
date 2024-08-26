/**
 * File: team.service
 * Author: Akshika.Choudhary
 * Date: 17-05-2024
 * Description: Service class for team
 */

import { Service, Inject } from 'fastify-decorators';
import { BaseService } from '../common/services/base.service';
import { TeamDAO } from '../dao';
import { logger } from '../common/services/logger.service';

@Service()
export class TeamService extends BaseService {
  @Inject(TeamDAO)
  private teamDAO!: TeamDAO;

  /**
   * Method to fetch team members details associated to a project.
   * @project_id
   * @returns
   */

  async fetchTeamDetails(project_id: number) {
    logger.debug(`TeamService -> fetchTeamDetails: fetch details of all members based on project_id: ${project_id}`);
    try {
      const teamDetails = await this.teamDAO.fetch(project_id);
      if (!teamDetails?.length) {
        logger.warn(`TeamService -> fetchTeamDetails : no team exists for project_id ${project_id}`);
        return [];
      }
      return teamDetails;
    } catch (error) {
      logger.error(`TeamService -> fetchTeamDetails : Failed to get team details for project_id :${project_id}`);

      throw error;
    }
  }
}
