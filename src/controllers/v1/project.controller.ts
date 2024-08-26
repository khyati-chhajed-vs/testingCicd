/**
 * File: project.controller
 * Author: AKSHIKA.CHOUDHARY
 * Date: 14-05-2024
 * Description: Controller for Project related APIs
 */

import { Controller, GET, Inject, PATCH } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BASE_ENDPOINT, STATUS_CODES } from '../../common/constants/common.constant';
import { logger } from '../../common/services/logger.service';
import {
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  TEAM_ENDPOINT,
  CONTACTS_ENDPOINT,
  PROGRESS_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
} from '../../common/constants/project.constant';

import { ProjectService, TeamService } from '../../services';
import { ContactRequest, ProjectProgressRequest, ProjectUpdateRequest, TeamRequest } from '../../types/v1';
import {
  getTeamResponseSchema,
  GetUserProjectsResponseSchema,
  GetContactResponseSchema,
  GetProjectProgressSchema,
  UpdateProjectSchema,
} from '../../schema/v1';
import { AuthController } from '../../common/controllers/auth.controller';
import ProjectMiddleWare from '../../common/middlewares/project.middleware';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';

@Controller({
  route: BASE_ENDPOINT + PROJECT_ENDPOINT,
})
export default class ProjectController extends AuthController {
  @Inject(ProjectService)
  private projectService!: ProjectService;

  @Inject(TeamService)
  private teamService!: TeamService;

  /**
   * API to fetch all projects of a user and their details
   * @param request
   * @param reply
   */
  @GET('', { schema: GetUserProjectsResponseSchema })
  async fetchUserProjects(request: FastifyRequest, reply: FastifyReply) {
    const userId: any = request.decodedToken?.vianaar_uid;
    logger.info(
      `ProjectController -> fetchUserProjects :: Request to fetch all projects and their details for a specific userId:  ${userId}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.projectService.fetchUserProjectsDetail(Number(userId)));
  }

  /**
   * API to fetch team member details for a given project_id
   * @param request
   * @param reply
   */
  @GET(PROJECT_ID_ENDPOINT + TEAM_ENDPOINT, {
    schema: getTeamResponseSchema,
    preHandler: [ProjectMiddleWare.validateCompletedProject],
  })
  async getTeamDetails(request: FastifyRequest<TeamRequest>, reply: FastifyReply) {
    logger.info(
      `ProjectController -> getEmergencyContact :: Request to fetch emergency contact for project_id : ${request.params.project_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.teamService.fetchTeamDetails(request.params.project_id));
  }

  /**
   * API to fetch emergency contact for given project ID
   * @param request
   * @param reply
   */
  @GET(PROJECT_ID_ENDPOINT + CONTACTS_ENDPOINT, {
    schema: GetContactResponseSchema,
    preHandler: [ProjectMiddleWare.validateCompletedProject],
  })
  async getContacts(request: FastifyRequest<ContactRequest>, reply: FastifyReply) {
    logger.info(
      `ProjectController -> getContact :: Request to fetch emergency contact for project_id : ${request.params.project_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.projectService.getContacts(request.params.project_id));
  }

  /**
   * API to update user project details
   * @param request
   * @param reply
   */
  @PATCH(PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT, {
    schema: UpdateProjectSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async update(request: FastifyRequest<ProjectUpdateRequest>, reply: FastifyReply) {
    const { project_id, unit_id } = request.params;
    logger.info(`ProjectController -> update :: update user project details : ${project_id}, unit_id : ${unit_id}`);
    const requestId = await this.projectService.updateUserProject(
      project_id,
      unit_id,
      request.body,
      null,
      request.data,
    );

    logger.info(
      `ProjectController -> update :: user project details updated successfully. project_id : ${project_id}, unit_id : ${unit_id}`,
    );

    reply.status(STATUS_CODES.NO_CONTENT).send(requestId);
  }

  /**
   * API to fetch project progress details for a given project_id
   * @param request
   * @param reply
   */
  @GET(PROJECT_ID_ENDPOINT + PROGRESS_ENDPOINT, {
    schema: GetProjectProgressSchema,
    preHandler: [ProjectMiddleWare.validateOngoingProject],
  })
  async getProgressDetails(request: FastifyRequest<ProjectProgressRequest>, reply: FastifyReply) {
    logger.info(
      `ProjectController -> getProgressDetails :: Request to fetch project progress details for project_id : ${request.params.project_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.projectService.getProgressDetails(request.params.project_id));
  }
}
