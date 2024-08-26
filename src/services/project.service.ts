/**
 * File: project.service
 * Author: Akshika.Choudhary
 * Date: 13-05-2024
 * Description: Service class for project
 */

import { Service, Inject } from 'fastify-decorators';
import { BaseService } from '../common/services/base.service';
import { UserProjectDAO, ContactDAO, ProjectProgressDAO, ProjectDAO } from '../dao';
import { logger } from '../common/services/logger.service';
import { Transaction } from 'sequelize';
import {
  FURNISH_PROPERTY_REQUEST_ERR,
  SERVICE_REQUEST_STATUS,
  PROJECT_STATUS,
  PROJECT_AND_UNIT_ERR,
} from '../common/constants';
import { BadRequestError } from '../common/exceptions/errors';

@Service()
export class ProjectService extends BaseService {
  @Inject(UserProjectDAO)
  private userProjectDAO!: UserProjectDAO;

  @Inject(ProjectProgressDAO)
  private projectProgressDAO!: ProjectProgressDAO;

  @Inject(ContactDAO)
  private emergencyContactDAO!: ContactDAO;

  @Inject(ProjectDAO)
  private projectDAO!: ProjectDAO;

  /**
   * Method to fetch all projects of a user
   * @returns
   */

  async fetchUserProjectsDetail(userId: number) {
    logger.debug(
      `ProjectService -> fetchUserProjectsDetail: fetch all projects and their details based on user_id: ${userId}`,
    );
    try {
      const projectDetails: any[] = await this.userProjectDAO.fetchUserProjectsDetails(userId);
      if (!projectDetails?.length) {
        logger.warn(`ProjectService -> fetchUserProjectsDetail : no projects find for userId : ${userId}`);
        return [];
      }
      return projectDetails;
    } catch (error) {
      logger.error(`ProjectService -> fetchUserProjectsDetail : Failed to fetch user projects, error: ${error}`);
    }
  }
  /**
   * Method to get contacts for given project ID
   * @param project_id
   * @returns
   */

  async getContacts(project_id: number) {
    try {
      const contacts = await this.emergencyContactDAO.fetch(project_id);

      if (!contacts?.length) {
        logger.warn(`ProjectService -> getContacts : no contacts found for project_id ${project_id}`);
        return [];
      }

      return contacts;
    } catch (error) {
      logger.error(`ProjectService -> get : Failed to get contacts for project_id :${project_id}, error: ${error}`);

      throw error;
    }
  }

  /**
   * Method to fetch project progress details for a given project_id
   * @param project_id
   */
  async getProgressDetails(project_id: number) {
    logger.debug(
      `ProjectService -> getProgressDetails: invoking service routine to fetch project progress details for project_id: ${project_id}`,
    );
    try {
      const [progressData] = await this.projectProgressDAO.getProgessDetails(project_id);

      if (!progressData) {
        logger.warn(`ProjectService -> getProgressDetails : no progress details found for project_id ${project_id}`);
        return [];
      }

      return progressData;
    } catch (error) {
      logger.error(
        `ProjectService -> getProgressDetails : Failed to get project progress details for project_id :${project_id}, error: ${error}`,
      );

      throw error;
    }
  }

  /**
   * Method to update project table by project_id
   * @param project_id
   * @param requestBody
   * @param transaction
   */
  async updateProject(project_id: number, requestBody: any, transaction?: Transaction | null) {
    logger.debug(`ProjectService -> updateProject :: updating record for project id ${project_id}`);
    try {
      await this.projectDAO.updateProjectsDetails(project_id, requestBody, transaction);
    } catch (error) {
      logger.error(
        `ProjectService -> updateProject : Failed to update project details for project_id :${project_id}, error: ${error}`,
      );
      throw error;
    }
  }

  /**
   * Method to update user project table by project_id and unit_id
   * @param project_id
   * @param unit_id
   */
  async updateUserProject(
    project_id: number,
    unit_id: number,
    requestBody: any,
    transaction?: Transaction | null,
    requestData?: any,
  ) {
    if (requestBody.hasOwnProperty('furnish_property_status')) {
      if (requestData.unitAndProject[0].project_status != PROJECT_STATUS.ONGOING) {
        logger.error(
          `ProjectService -> updateUserProject :  Given project id not found or this request is not allowed in present state :${project_id}, ${unit_id}`,
        );
        throw new BadRequestError(PROJECT_AND_UNIT_ERR.PROJECT_STATUS_INVALID.CODE);
      } else if (requestData?.unitAndProject[0]?.furnish_property_status != SERVICE_REQUEST_STATUS.NOT_STARTED) {
        logger.error(`ProjectService -> updateUserProject :request already exist :${project_id}, ${unit_id}`);
        throw new BadRequestError(FURNISH_PROPERTY_REQUEST_ERR.ALREADY_EXISTS.CODE);
      }
    }
    if (requestBody.hasOwnProperty('rental_request_status')) {
      if (requestData.unitAndProject[0].is_rental_enabled == true) {
        logger.error(
          `ProjectService -> updateUserProject :  Given project id not found or this request is not allowed in present state :${project_id}, ${unit_id}`,
        );
        throw new BadRequestError(PROJECT_AND_UNIT_ERR.NOT_FOUND_OR_STATUS_INVALID.CODE);
      } else if (requestData?.unitAndProject[0]?.rental_request_status != SERVICE_REQUEST_STATUS.NOT_STARTED) {
        logger.error(`ProjectService -> updateUserProject :request already exist :${project_id}, ${unit_id}`);
        throw new BadRequestError(FURNISH_PROPERTY_REQUEST_ERR.ALREADY_EXISTS.CODE);
      }
    }

    logger.debug(`ProjectService -> updateUserProject :: updating record with data ${JSON.stringify(requestBody)}`);
    return await this.userProjectDAO.updateRecord(project_id, unit_id, requestBody, transaction);
  }

  /**
   * Method to get unit and project details with user_ID and project and unit id
   * @param project_id
   * @param unit_id
   * @param user_id
   * @returns
   */

  async getUnitAndProject(unit_id: number, project_id: number, user_id: number) {
    logger.debug(
      `ProjectService -> getUnitAndProject : invoking service routine to fetch project and unit  details for project_id: ${project_id} and unit_id: ${unit_id}`,
    );
    try {
      const unitAndProject = await this.userProjectDAO.findUnitAndProject(unit_id, project_id, user_id);

      if (!unitAndProject.length || unitAndProject == null) {
        logger.error(
          `NotificationService -> get :: Given project and unit id not found. project_id : ${project_id}, unit_id : ${unit_id} `,
        );

        throw new BadRequestError(PROJECT_AND_UNIT_ERR.NOT_FOUND.CODE);
      }

      return unitAndProject;
    } catch (error) {
      logger.error(
        `ProjectService -> getUnitAndProject : Failed to get project and unit details for project_id :${project_id}, error: ${error}`,
      );

      throw error;
    }
  }
}
